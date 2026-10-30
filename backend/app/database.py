import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

logger = logging.getLogger("smart_city.database")

# Attempt primary PostgreSQL connection, with graceful SQLite fallback for testing / offline dev
DATABASE_URL = settings.DATABASE_URL
engine = None
SessionLocal = None

try:
    if settings.TESTING:
        DATABASE_URL = "sqlite:///./test_smart_city.db"
        engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    else:
        # Connect to PostgreSQL
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
        )
        # Test connection briefly
        with engine.connect() as conn:
            pass
        logger.info(f"Connected successfully to PostgreSQL at: {settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}")
except Exception as e:
    logger.warning(
        f"PostgreSQL connection to {DATABASE_URL} failed: {e}. "
        "Falling back to local SQLite database ('smart_city_dev.db') so the application runs immediately. "
        "To connect your PostgreSQL with DataGrip, ensure PostgreSQL is running with credentials in backend/.env!"
    )
    DATABASE_URL = "sqlite:///./smart_city_dev.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Dependency that provides a transactional database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Creates all database tables defined in SQLAlchemy models."""
    from app import models  # noqa: F401
    Base.metadata.create_all(bind=engine)

