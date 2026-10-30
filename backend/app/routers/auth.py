import logging
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import UserSignUp, UserLogin, GoogleAuthRequest, TokenResponse, UserResponse
from app.security import hash_password, verify_password, create_access_token, decode_access_token
from app.services.google_auth import verify_google_token

logger = logging.getLogger("smart_city.auth")
router = APIRouter(prefix="/auth", tags=["Authentication"])
security_bearer = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_bearer),
    db: Session = Depends(get_db),
) -> User:
    """Dependency that extracts and validates the JWT Bearer token, returning the User."""
    if not credentials or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer access token in Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        payload = decode_access_token(credentials.credentials)
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload: missing subject identifier",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification failed: {e}",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Convert string user_id to UUID if needed
    try:
        import uuid
        uid = uuid.UUID(user_id) if isinstance(user_id, str) else user_id
    except ValueError:
        uid = user_id

    user = db.query(User).filter(User.id == uid).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User associated with this token was not found",
        )
    return user


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: UserSignUp, db: Session = Depends(get_db)):
    """
    POST /auth/signup
    Registers a new user with standard email and bcrypt-hashed password.
    Returns access token and user profile.
    """
    normalized_email = payload.email.strip().lower()

    # 1. Check if user already exists
    existing_user = db.query(User).filter(User.email == normalized_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address is already registered. Please log in instead.",
        )

    # 2. Hash password with bcrypt
    hashed_pwd = hash_password(payload.password)

    # 3. Create and persist user entity in PostgreSQL
    new_user = User(
        email=normalized_email,
        full_name=payload.full_name.strip(),
        hashed_password=hashed_pwd,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    logger.info(f"New user registered successfully: {new_user.email} (UUID: {new_user.id})")

    # 4. Generate JWT token
    access_token = create_access_token(
        data={"sub": str(new_user.id), "email": new_user.email, "name": new_user.full_name}
    )

    user_response = UserResponse(
        id=new_user.id,
        email=new_user.email,
        full_name=new_user.full_name,
        created_at=new_user.created_at,
        has_password=True,
        auth_provider="local",
    )

    return TokenResponse(access_token=access_token, token_type="bearer", user=user_response)


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    """
    POST /auth/login
    Authenticates a user with email and password.
    Returns JWT access token.
    """
    normalized_email = payload.email.strip().lower()

    user = db.query(User).filter(User.email == normalized_email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Check if user registered via Google (no password set)
    if user.hashed_password is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account was registered using Google Sign-In. Please click 'Continue with Google' to log in.",
        )

    # Verify bcrypt password
    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Issue JWT token
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "name": user.full_name}
    )

    user_response = UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        created_at=user.created_at,
        has_password=True,
        auth_provider="local",
    )

    return TokenResponse(access_token=access_token, token_type="bearer", user=user_response)


@router.post("/google", response_model=TokenResponse)
def google_auth(payload: GoogleAuthRequest, db: Session = Depends(get_db)):
    """
    POST /auth/google
    Accepts Google ID token from frontend, verifies it with Google OAuth2 API,
    registers or logs in the user, and returns JWT.
    """
    try:
        google_user_info = verify_google_token(payload.credential)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google token verification failed: {e}",
        )

    google_email = google_user_info["email"].lower()
    full_name = google_user_info.get("full_name") or google_email.split("@")[0].title()

    # Look up user by email
    user = db.query(User).filter(User.email == google_email).first()

    if user:
        # Existing user - login
        logger.info(f"Existing user signed in via Google: {user.email}")
        has_password = user.hashed_password is not None
        auth_provider = "hybrid" if has_password else "google"
    else:
        # New user - register with hashed_password=None (as per schema spec)
        user = User(
            email=google_email,
            full_name=full_name,
            hashed_password=None,  # Nullable for Google auth users
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        logger.info(f"New user registered via Google: {user.email} (UUID: {user.id})")
        has_password = False
        auth_provider = "google"

    # Generate our application's JWT access token
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "name": user.full_name, "provider": "google"}
    )

    user_response = UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        created_at=user.created_at,
        has_password=has_password,
        auth_provider=auth_provider,
    )

    return TokenResponse(access_token=access_token, token_type="bearer", user=user_response)


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """
    GET /auth/me
    Returns the currently authenticated user's profile based on the JWT Bearer token.
    """
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        created_at=current_user.created_at,
        has_password=current_user.hashed_password is not None,
        auth_provider="google" if current_user.hashed_password is None else "local",
    )

