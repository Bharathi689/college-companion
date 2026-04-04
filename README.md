# 🏛️ College Companion App
### Pingle Govt. College for Women (A), Wanapathy, Hanumakonda

A full-stack web application built with **React** (frontend) + **Flask** (backend) featuring:

- 🔐 Role-based authentication (Admin / Student)
- 📊 Dashboard with live stats and quick navigation
- 📢 Announcements, Events, Timetable
- 📝 Assignments, Activities (Quiz, Seminar, Jignasa, Tech Sakhi, Workshops…)
- 📚 Resources & E-Library (Video Lessons, PPTs, T-SAT, MOOCs…)
- 🤝 Mentor / Mentee management
- 📈 Student Progression (Placements, Higher Studies, Achievements)
- ⚠️ Grievances management
- 👩‍🎓 Students & Faculty management with CSV import/export
- 🗂️ **College Tabs** — 3 sections × 18 tabs, all editable with CSV upload/download:
  - **Skill Enhancement**: Certificate Courses, Student Research, Fieldtech, MOOCs, Jignasa
  - **Student Centric**: Bridge Courses, Group Discussions, Seminars, Quiz, Assignments
  - **Other Activities**: Extension Lectures, Workshops, Video Lessons, Results, E-Library, Technology Updates, Career Guidance, Personal Counselling, Social Responsibilities, T-SAT Lessons, Remedial Coaching, Tech Skills Advanced Learners

---

## 🚀 Setup & Run

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

---

### 1. Backend (Flask API)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

Backend runs at: **http://localhost:5000**

---

### 2. Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs at: **http://localhost:3000**

The React app proxies `/api` calls to the Flask backend automatically.

---

## 🔑 Demo Login Credentials

| Role    | Username  | Password    |
|---------|-----------|-------------|
| Admin   | `admin`   | `admin123`  |
| Student | `student` | `student123`|

**Admin** can: Add, Edit, Delete records, Import/Export CSV, Clear data  
**Student** can: View all data, Export CSV

---

## 📁 Project Structure

```
college-companion/
├── backend/
│   ├── app.py              # Flask API (all routes, CRUD, auth)
│   ├── requirements.txt    # Python dependencies
│   └── data/               # JSON data files (auto-created on first run)
│       ├── users.json
│       ├── announcements.json
│       ├── activities.json
│       └── ... (one file per resource)
│
└── frontend/
    ├── public/index.html
    ├── package.json
    └── src/
        ├── App.jsx             # Routes
        ├── index.js            # Entry point
        ├── index.css           # Global styles (Royal Blue + Gold theme)
        ├── context/
        │   └── AuthContext.jsx # Auth state management
        ├── utils/
        │   └── api.js          # Axios instance
        ├── components/
        │   ├── Layout.jsx      # App shell (sidebar + topbar)
        │   ├── Sidebar.jsx     # Navigation sidebar
        │   └── CrudTable.jsx   # Reusable CRUD table component
        └── pages/
            ├── Login.jsx
            ├── Dashboard.jsx
            ├── Announcements.jsx
            ├── Events.jsx
            ├── Timetable.jsx
            ├── Assignments.jsx
            ├── Activities.jsx
            ├── Resources.jsx
            ├── CollegeTabs.jsx  # All 18 college tabs
            ├── MentorMentee.jsx
            ├── Progression.jsx
            ├── Grievances.jsx
            ├── Students.jsx
            └── Faculty.jsx
```

---

## 📥 CSV Import Format

Each page supports CSV import. Use these column headers:

### Students
`student_id, name, course, year, section, roll_no, phone, email, dob, category, address, guardian, guardian_phone`

### Faculty
`faculty_id, name, designation, department, qualification, specialization, phone, email, type, joining_date, experience`

### Activities
`title, type, date, venue, coordinator, status, description, participants`

### College Tabs — Certificate Courses
`student_name, roll_no, course, year, certificate_name, issuing_body, duration, completion_date, grade, remarks`

*(See the app's CSV export for exact column headers of any tab)*

---

## 🎨 Design

- **Primary**: Deep Royal Blue (`#1a2b6b`)
- **Accent**: Warm Gold (`#c9a227`)
- **Typography**: Cormorant Garamond (headings) + DM Sans (body)
- Responsive design for desktop and mobile

---

## 🔧 Production Deployment

For production:
1. Run `npm run build` in the frontend folder
2. Serve the `build/` folder as static files via Flask or Nginx
3. Use a proper database (PostgreSQL/MySQL) instead of JSON files
4. Set a strong `SECRET_KEY` in `app.py`
5. Use HTTPS

---

*Built for Pingle Govt. College for Women (A), Wanapathy, Hanumakonda, Telangana*
