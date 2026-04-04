import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import Timetable from './pages/Timetable';
import Assignments from './pages/Assignments';
import Activities from './pages/Activities';
import Resources from './pages/Resources';
import CollegeTabs from './pages/CollegeTabs';
import MentorMentee from './pages/MentorMentee';
import Progression from './pages/Progression';
import Grievances from './pages/Grievances';
import Students from './pages/Students';
import Faculty from './pages/Faculty';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'DM Sans,sans-serif', color:'var(--gray-600)' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:40, marginBottom:16 }}>🏛️</div>
        <p>Loading College Companion…</p>
      </div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily:'DM Sans,sans-serif', fontSize:13.5 },
          success: { iconTheme: { primary:'var(--royal-blue)', secondary:'#fff' } }
        }}/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Layout /></Protected>}>
            <Route index element={<Dashboard />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="events" element={<Events />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="activities" element={<Activities />} />
            <Route path="resources" element={<Resources />} />
            <Route path="college-tabs" element={<CollegeTabs />} />
            <Route path="mentor-mentee" element={<MentorMentee />} />
            <Route path="progression" element={<Progression />} />
            <Route path="grievances" element={<Grievances />} />
            <Route path="students" element={<Students />} />
            <Route path="faculty" element={<Faculty />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
