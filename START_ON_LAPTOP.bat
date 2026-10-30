@echo off
echo =====================================================================
echo   AMMAN URBAN DIGITAL TWIN - 1-CLICK SYSTEM LAUNCHER
echo =====================================================================
echo.

REM 1. Start Backend in separate window
echo [1/3] Starting Backend API Server (FastAPI + Database)...
start "Amman Digital Twin - Backend (Port 8000)" cmd /k "cd backend && python run.py"

REM 2. Install frontend dependencies if needed and start Vite
echo [2/3] Starting Frontend Server (Vite + React)...
start "Amman Digital Twin - Frontend (Port 5173)" cmd /k "cd frontend && if not exist node_modules (echo Installing node_modules... && npm install) && npm run dev"

REM 3. Wait briefly and open browser
echo [3/3] Launching Web Interface...
timeout /t 3 >nul
start http://localhost:5173

echo.
echo =====================================================================
echo System is running!
echo Frontend: http://localhost:5173
echo Backend API Docs: http://localhost:8000/docs
echo =====================================================================
