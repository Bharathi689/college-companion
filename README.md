College Companion App
Pingle Government College for Women (Autonomous), Wanaparthy, Hanumakonda

A full-stack web application designed to streamline academic and administrative activities within the institution. This system integrates a React-based frontend with a Flask-powered backend, delivering a modern, responsive, and role-based platform for students and administrators.

🌟 Key Features
🔐 Authentication & Access Control
Secure role-based login system (Admin / Student)
Controlled access to features based on user roles
📊 Dashboard & Navigation
Interactive dashboard with real-time insights
Quick navigation to all major modules
📢 Academic & Communication Modules
Announcements & Events Management
Timetable Scheduling
Assignment Tracking
📝 Student Activities
Quiz, Seminars, Workshops
Jignasa, Tech Sakhi, and more
Participation tracking and records
📚 Resources & E-Library
Video lessons, PPTs, T-SAT content
MOOCs and digital learning materials
🤝 Mentorship System
Mentor–Mentee allocation and tracking
📈 Student Progression
Placements
Higher Studies
Achievements tracking
⚠️ Grievance Management
Submit and manage student grievances efficiently
👩‍🎓 Data Management
Student & Faculty records
CSV Import/Export support
Easy data editing and management
🗂️ College Tabs Module

Comprehensive academic tracking divided into 3 major sections with 18 customizable tabs:

🎯 Skill Enhancement
Certificate Courses
Student Research
Fieldtech
MOOCs
Jignasa
🎓 Student-Centric Activities
Bridge Courses
Group Discussions
Seminars
Quiz & Assignments
🌐 Other Activities
Extension Lectures
Workshops
Video Lessons
Results
E-Library
Technology Updates
Career Guidance
Personal Counselling
Social Responsibility
T-SAT Lessons
Remedial Coaching
Advanced Tech Skills

All tabs support CSV upload/download and editing.

🚀 Getting Started
🔧 Prerequisites
Python 3.9+
Node.js 18+
npm
⚙️ Backend Setup (Flask API)
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py

📍 Backend URL: http://localhost:5000

🎨 Frontend Setup (React)
cd frontend

# Install dependencies
npm install

# Start development server
npm start

📍 Frontend URL: http://localhost:3000

The frontend automatically proxies API requests to the backend.

🔑 Demo Credentials
Role	Username	Password
Admin	admin	admin123
Student	student	student123
👨‍💼 Admin Capabilities
Add, Edit, Delete data
Import/Export CSV
Clear records
🎓 Student Capabilities
View all data
Export CSV
📁 Project Structure
college-companion/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── data/
│       ├── users.json
│       ├── announcements.json
│       └── ...
│
└── frontend/
    ├── public/
    ├── package.json
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        ├── utils/
        └── App.jsx
📥 CSV Import Format
Students
student_id, name, course, year, section, roll_no, phone, email, dob, category, address, guardian, guardian_phone
Faculty
faculty_id, name, designation, department, qualification, specialization, phone, email, type, joining_date, experience
Activities
title, type, date, venue, coordinator, status, description, participants
Certificate Courses
student_name, roll_no, course, year, certificate_name, issuing_body, duration, completion_date, grade, remarks
🎨 UI & Design
Primary Color: Deep Royal Blue (#1a2b6b)
Accent Color: Warm Gold (#c9a227)
Fonts:
Headings: Cormorant Garamond
Body: DM Sans

✔ Fully responsive design (desktop + mobile)

🚀 Production Deployment

For deploying the application:

Build frontend:
npm run build
Serve the build/ folder via Flask or a web server
Use a production database (PostgreSQL / MySQL)
Configure a secure SECRET_KEY
Enable HTTPS for security
📌 Conclusion

The College Companion App provides a centralized, scalable, and user-friendly platform for managing academic, administrative, and student-centric activities efficiently. It enhances digital transformation within educational institutions.
