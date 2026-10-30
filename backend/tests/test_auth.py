import os
import json
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Set testing environment before importing app
os.environ["TESTING"] = "true"

from app.database import Base, get_db
from app.main import app

# Test SQLite in-memory engine
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_runner.db"
test_engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


@pytest.fixture(autouse=True, scope="module")
def setup_database():
    """Create fresh tables for testing and clean up afterward."""
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)
    if os.path.exists("./test_runner.db"):
        try:
            os.remove("./test_runner.db")
        except Exception:
            pass


def test_root_status():
    """Verify system root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "operational"
    assert "mobility_backend" in data


def test_signup_success():
    """Test standard user registration (POST /auth/signup)."""
    payload = {
        "email": "engineer.faris@amman-digital-twin.jo",
        "password": "SecurePassword2026!",
        "full_name": "Faris_AlMajali",
    }
    response = client.post("/auth/signup", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == payload["email"]
    assert data["user"]["full_name"] == payload["full_name"]
    assert "id" in data["user"]
    assert data["user"]["has_password"] is True


def test_signup_name_with_spaces_rejected():
    """Ensure full_name with spaces is rejected."""
    payload = {
        "email": "spaced.name@smartcity.jo",
        "password": "SecurePassword2026!",
        "full_name": "Ahmad With Space",
    }
    response = client.post("/auth/signup", json=payload)
    assert response.status_code == 422
    assert "space" in response.text.lower()


def test_signup_duplicate_email():
    """Test duplicate registration error."""
    payload = {
        "email": "engineer.faris@amman-digital-twin.jo",
        "password": "AnotherPassword123!",
        "full_name": "Duplicate_Faris",
    }
    response = client.post("/auth/signup", json=payload)
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"].lower()


def test_signup_validation_short_password():
    """Test signup validation fails when password is too short (<6 characters)."""
    payload = {
        "email": "short@smartcity.jo",
        "password": "123",
        "full_name": "Short Password User",
    }
    response = client.post("/auth/signup", json=payload)
    assert response.status_code == 422


def test_login_success():
    """Test standard user login (POST /auth/login)."""
    payload = {
        "email": "engineer.faris@amman-digital-twin.jo",
        "password": "SecurePassword2026!",
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == payload["email"]


def test_login_wrong_password():
    """Test login failure with incorrect password."""
    payload = {
        "email": "engineer.faris@amman-digital-twin.jo",
        "password": "WrongPasswordXYZ",
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 401
    assert "invalid email or password" in response.json()["detail"].lower()


def test_login_nonexistent_user():
    """Test login failure with nonexistent email."""
    payload = {
        "email": "nonexistent@smartcity.jo",
        "password": "SomePassword123!",
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 401


def test_google_auth_new_user_registration():
    """Test Google OAuth registration (POST /auth/google)."""
    # Using simulated token format handled by google_auth service for test environments
    mock_token = json.dumps({
        "mock_email": "rana.digitaltwin@gmail.com",
        "mock_name": "Rana Al-Qudah",
        "sub": "google-oauth-1092837465",
    })
    response = client.post("/auth/google", json={"credential": mock_token})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["email"] == "rana.digitaltwin@gmail.com"
    assert data["user"]["full_name"] == "Rana Al-Qudah"
    assert data["user"]["auth_provider"] == "google"
    # Ensure hashed_password is Null for Google users as specified in requirements
    assert data["user"]["has_password"] is False


def test_google_user_cannot_login_with_password():
    """Ensure Google-registered user cannot login with random password and receives helpful instruction."""
    payload = {
        "email": "rana.digitaltwin@gmail.com",
        "password": "ArbitraryPassword123!",
    }
    response = client.post("/auth/login", json=payload)
    assert response.status_code == 400
    assert "google sign-in" in response.json()["detail"].lower()


def test_google_auth_existing_user_login():
    """Test Google login for existing user returns token without error."""
    mock_token = json.dumps({
        "mock_email": "rana.digitaltwin@gmail.com",
        "mock_name": "Rana Al-Qudah",
        "sub": "google-oauth-1092837465",
    })
    response = client.post("/auth/google", json={"credential": mock_token})
    assert response.status_code == 200
    data = response.json()
    assert data["user"]["email"] == "rana.digitaltwin@gmail.com"


def test_get_current_user_profile():
    """Test GET /auth/me with Bearer JWT token."""
    # First login to get a fresh token
    login_res = client.post(
        "/auth/login",
        json={"email": "engineer.faris@amman-digital-twin.jo", "password": "SecurePassword2026!"},
    )
    token = login_res.json()["access_token"]

    # Call /auth/me
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    user_data = response.json()
    assert user_data["email"] == "engineer.faris@amman-digital-twin.jo"
    assert user_data["full_name"] == "Faris_AlMajali"


def test_get_current_user_unauthorized():
    """Test GET /auth/me without token returns 401."""
    response = client.get("/auth/me")
    assert response.status_code == 401

