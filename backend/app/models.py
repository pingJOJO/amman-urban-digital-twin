import uuid
from sqlalchemy import Column, String, DateTime, func, Uuid
from app.database import Base


class User(Base):
    """
    User entity for the Smart City Digital Twin application.
    Stored in PostgreSQL 'users' table.
    
    Fields:
      - id: UUID (Primary Key)
      - email: String (Unique, Indexed, Not Null)
      - hashed_password: String (Nullable - null for users signing in via Google OAuth2)
      - full_name: String (Not Null)
      - created_at: Timestamp (Not Null, auto-generated on insert)
    """
    __tablename__ = "users"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=True)  # Nullable for Google auth users
    full_name = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), default=func.now(), nullable=False)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', full_name='{self.full_name}')>"

