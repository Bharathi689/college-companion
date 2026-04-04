import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Megaphone, BookOpen, Users, Briefcase,
  GraduationCap, FileText, HeartHandshake, TrendingUp, AlertCircle,
  Video, Library, Calendar, Grid3x3, LogOut, School
} from 'lucide-react';

const sections = [
  { label: 'Main', items: [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' },
    { to: '/events', icon: Calendar, label: 'Events' },
  ]},
  { label: 'Academics', items: [
    { to: '/timetable', icon: Grid3x3, label: 'Timetable' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/activities', icon: BookOpen, label: 'Activities' },
  ]},
  { label: 'Resources', items: [
    { to: '/resources', icon: Video, label: 'Resources & Library' },
    { to: '/college-tabs', icon: Library, label: 'College Tabs' },
  ]},
  { label: 'Student Support', items: [
    { to: '/mentor-mentee', icon: HeartHandshake, label: 'Mentor / Mentee' },
    { to: '/progression', icon: TrendingUp, label: 'Student Progression' },
    { to: '/grievances', icon: AlertCircle, label: 'Grievances' },
  ]},
  { label: 'People', items: [
    { to: '/students', icon: GraduationCap, label: 'Students' },
    { to: '/faculty', icon: Briefcase, label: 'Faculty' },
  ]},
];

export default function Sidebar({ open, onClose }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="emblem">🏛️</div>
        <div className="college-name">Pingle Govt. College<br/>for Women (A)</div>
        <div className="college-sub">Wanapathy, Hanumakonda</div>
      </div>

      <div className="sidebar-nav">
        {sections.map(sec => (
          <div key={sec.label}>
            <div className="sidebar-section-label">{sec.label}</div>
            {sec.items.map(item => (
              <NavLink
                key={item.to} to={item.to}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
                end={item.to === '/'}
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        {user && (
          <div className="user-badge" style={{ marginBottom: 10 }}>
            <div className="avatar">{user.name[0]}</div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
        )}
        <button className="nav-item" onClick={handleLogout}>
          <LogOut size={16} /><span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
