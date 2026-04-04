import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const titles = {
  '/': 'Dashboard', '/announcements': 'Announcements', '/events': 'Events',
  '/timetable': 'Timetable', '/assignments': 'Assignments', '/activities': 'Activities',
  '/resources': 'Resources & Library', '/college-tabs': 'College Tabs',
  '/mentor-mentee': 'Mentor / Mentee', '/progression': 'Student Progression',
  '/grievances': 'Grievances', '/students': 'Students', '/faculty': 'Faculty',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const title = titles[location.pathname] || 'College Companion';

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:99 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="main-content">
        <header className="topbar">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button
              style={{ display:'none', background:'none',border:'none',cursor:'pointer',padding:4 }}
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <span className="topbar-title">{title}</span>
          </div>
          <div className="topbar-actions">
            <span style={{ fontSize:12.5, color:'var(--gray-600)' }}>
              Welcome, <strong>{user?.name}</strong>
            </span>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
