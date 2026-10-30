import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict


class UserSignUp(BaseModel):
    """Payload for POST /auth/signup."""
    email: EmailStr = Field(..., description="Valid user email address", examples=["engineer@amman-digital-twin.jo"])
    password: str = Field(..., min_length=8, max_length=128, description="Password (at least 8 characters with uppercase and number/symbol)", examples=["SecurePass123!"])
    full_name: str = Field(..., min_length=2, max_length=255, description="Full name of the user", examples=["Doha Ziad"])

    @field_validator("full_name")
    def validate_full_name(cls, v: str) -> str:
        clean = v.strip()
        if len(clean) < 2:
            raise ValueError("Full name must be at least 2 characters long")
        return clean

    @field_validator("password")
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain at least one uppercase letter (A-Z)")
        if not any(c.isdigit() or not c.isalnum() for c in v):
            raise ValueError("Password must contain at least one number or special character")
        return v


class UserLogin(BaseModel):
    """Payload for POST /auth/login."""
    email: EmailStr = Field(..., description="Registered user email", examples=["engineer@amman-digital-twin.jo"])
    password: str = Field(..., description="Account password", examples=["SecurePass123!"])


class GoogleAuthRequest(BaseModel):
    """Payload for POST /auth/google."""
    credential: str = Field(..., description="Google ID Token issued by Google OAuth2 Sign-In")


class UserResponse(BaseModel):
    """User profile data returned in authentication responses."""
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: str
    full_name: str
    created_at: datetime
    has_password: bool = True
    auth_provider: str = "local"


class TokenResponse(BaseModel):
    """Standard Bearer token response."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
