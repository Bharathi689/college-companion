@echo off
echo 🏛️  Starting College Companion App...
echo.

echo Starting Flask backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt -q
start /B python app.py
cd ..

timeout /t 2 /nobreak >nul

echo Starting React frontend...
cd frontend
call npm install --silent
start /B npm start

echo.
echo App running!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo Admin:   admin / admin123
echo Student: student / student123
echo.
pause
