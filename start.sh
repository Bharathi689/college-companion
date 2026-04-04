#!/bin/bash
# Quick start script for College Companion App
echo "🏛️  Starting College Companion App..."
echo ""

# Start backend
echo "▶ Starting Flask backend (port 5000)..."
cd backend
python -m venv venv 2>/dev/null || true
source venv/bin/activate 2>/dev/null || venv\Scripts\activate 2>/dev/null
pip install -r requirements.txt -q
python app.py &
BACKEND_PID=$!
cd ..

# Wait for backend
sleep 2

# Start frontend
echo "▶ Starting React frontend (port 3000)..."
cd frontend
npm install --silent
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ App running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "   Admin login:   admin / admin123"
echo "   Student login: student / student123"
echo ""
echo "Press Ctrl+C to stop both servers."

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
