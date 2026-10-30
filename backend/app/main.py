import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.routers.auth import router as auth_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("smart_city.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database tables are created
    logger.info("Initializing Smart City Digital Twin Database Schema...")
    try:
        init_db()
        logger.info("Database schema initialized successfully.")
    except Exception as e:
        logger.error(f"Database initialization error: {e}")
    yield
    # Shutdown
    logger.info("Shutting down Smart City Digital Twin Backend...")


app = FastAPI(
    title="Smart City Digital Twin - Authentication & Mobility Service",
    description=(
        "Backend API for Amman Urban Digital Twin Web Application. "
        "Provides JWT authentication, Google OAuth2 integration, PostgreSQL persistence, "
        "and architectural readiness for SUMO (Simulation of Urban MObility) backend integration."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Authentication Router
app.include_router(auth_router)


@app.get("/", tags=["System"])
def root_status():
    """System health and metadata endpoint."""
    return {
        "project": "Amman Smart City Urban Digital Twin",
        "service": "Authentication & Mobility API",
        "version": "1.0.0",
        "database": "PostgreSQL (SQLAlchemy ORM)",
        "mobility_backend": "SUMO (Simulation of Urban MObility) Python Bridge",
        "endpoints": {
            "signup": "/auth/signup",
            "login": "/auth/login",
            "google_auth": "/auth/google",
            "profile": "/auth/me",
            "interactive_docs": "/docs",
            "openapi_spec": "/openapi.json",
        },
        "status": "operational",
    }


@app.get("/health", tags=["System"])
def health_check():
    """Simple liveness probe."""
    return {"status": "healthy"}

