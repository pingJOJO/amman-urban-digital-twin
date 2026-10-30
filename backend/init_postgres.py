import sys
from app.config import settings
from app.database import engine, Base
import app.models

print("Connecting to:", engine.url)
try:
    with engine.connect() as conn:
        print("Connected to engine successfully!")
    Base.metadata.create_all(bind=engine)
    print("All SQLAlchemy tables created successfully in PostgreSQL (smart_city_db)!")
except Exception as e:
    print("Error creating tables:", e)
    sys.exit(1)
