import uvicorn
import os
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    print(f"\n=======================================================")
    print(f"🚀 Starting Smart City Digital Twin Backend API")
    print(f"   URL: http://localhost:{port}")
    print(f"   Docs: http://localhost:{port}/docs")
    print(f"   Database: PostgreSQL (DataGrip ready)")
    print(f"=======================================================\n")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)

