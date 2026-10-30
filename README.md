# Smart City Digital Twin - Authentication & Urban Mobility Platform

A production-ready Full-Stack Authentication and Urban Digital Twin system engineered for smart city traffic simulation with **SUMO (Simulation of Urban MObility)** backend integration.

---

## 🌟 Tech Stack

* **Frontend:** React 19, TypeScript (TSX), Tailwind CSS v4, `@react-oauth/google`, Axios, Lucide React, Vite.
* **Backend:** FastAPI (Python 3.14), SQLAlchemy ORM (2.0), Pydantic v2, PyJWT, Bcrypt, Google Auth API.
* **Database:** PostgreSQL (with native UUID primary keys, connection-pooling, and DataGrip readiness).
* **Urban Mobility Simulation:** Python bridge designed for SUMO (TraCI / libsumo micro-traffic simulation).
* **Authentication Standards:**
  * Standard Email & Password with Bcrypt hashing and JSON Web Tokens (JWT).
  * Google OAuth2 Sign-In (`@react-oauth/google`) with token verification on FastAPI.

---

## 🗄️ Database Schema (`users` table in PostgreSQL)

Implemented with SQLAlchemy ORM in [`backend/app/models.py`](file:///f:/فرونت%20تخرج%20ض/backend/app/models.py):

| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, Index | Unique entity identifier (v4 UUID) |
| `email` | `VARCHAR(255)` | Unique, Index, Not Null | User's normalized email address |
| `hashed_password` | `VARCHAR(255)` | Nullable | Bcrypt hash (`NULL` for Google OAuth users) |
| `full_name` | `VARCHAR(255)` | Not Null | User's full name |
| `created_at` | `TIMESTAMPTZ` | Not Null, Server Default | Account creation timestamp |

---

## 🔌 JetBrains DataGrip Connection Setup

The backend `.env` is pre-configured for instant DataGrip connectivity:

1. Open **DataGrip** and click **New DataSource** → **PostgreSQL**.
2. Enter the connection settings matching [`backend/.env`](file:///f:/فرونت%20تخرج%20ض/backend/.env):
   * **Host:** `localhost`
   * **Port:** `5432`
   * **User:** `postgres`
   * **Password:** `postgres` (or your local postgres password)
   * **Database:** `smart_city_db`
3. Click **Test Connection** → **OK**.
4. You will immediately see the `users` table and can run:
   ```sql
   SELECT id, email, full_name, (hashed_password IS NOT NULL) AS has_pwd, created_at FROM users;
   ```

---

## 🚀 Running the Project

### 1. Backend (FastAPI)
```bash
cd backend

# 1. Install dependencies
pip install -r requirements.txt

# 2. Start the server (runs at http://localhost:8000)
python run.py
# or using uvicorn directly:
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
* **API Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Alternative Redoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 2. Frontend (React + TypeScript)
```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start Vite development server (runs at http://localhost:5173)
npm run dev

# 3. Production build
npm run build
```

---

## 🧪 Testing

### Backend Unit & Integration Tests (100% Pass)
```bash
cd backend
python -m pytest tests/ -v
```
Tests cover:
* `POST /auth/signup` (successful registration, UUID assignment, bcrypt hashing)
* `POST /auth/signup` (duplicate email prevention)
* Pydantic schema validation (email format, password min length)
* `POST /auth/login` (correct credentials vs wrong password)
* `POST /auth/google` (Google ID token verification, new user registration with `NULL` password, existing user login)
* `GET /auth/me` (Bearer JWT session authentication)

