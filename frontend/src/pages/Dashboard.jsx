import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Users, BookOpen, Megaphone, AlertCircle, FileText, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const QuickLink = ({ icon: Icon, label, to, color }) => (
  <a href={to} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:20,
    background:'#fff', borderRadius:'var(--radius)', border:'1px solid var(--gray-200)',
    textDecoration:'none', color:'var(--gray-800)', transition:'all 0.18s', boxShadow:'var(--shadow-sm)' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor=color; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--gray-200)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}>
    <div style={{ width:40,height:40,borderRadius:'50%',background:`${color}18`,display:'flex',alignItems:'center',justifyContent:'center' }}>
      <Icon size={20} color={color}/>
    </div>
    <span style={{ fontSize:12.5, fontWeight:500 }}>{label}</span>
  </a>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/dashboard-stats').then(r => setStats(r.data));
    api.get('/announcements').then(r => setAnnouncements(r.data.slice(-5).reverse()));
    api.get('/activities').then(r => setActivities(r.data.slice(-4).reverse()));
    api.get('/events').then(r => setEvents(r.data.slice(-5).reverse()));
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats.students || 0, color: 'blue', icon: GraduationCap },
    { label: 'Faculty Members', value: stats.faculty || 0, color: 'gold', icon: Users },
    { label: 'Announcements', value: stats.announcements || 0, color: 'cyan', icon: Megaphone },
    { label: 'Activities', value: stats.activities || 0, color: 'purple', icon: BookOpen },
    { label: 'Assignments', value: stats.assignments || 0, color: 'green', icon: FileText },
    { label: 'Open Grievances', value: stats.grievances || 0, color: 'red', icon: AlertCircle },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--royal-blue-dark) 0%, var(--royal-blue) 60%, var(--royal-blue-light) 100%)',
        borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: 24, color: '#fff',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position:'absolute', right:20, top:'50%', transform:'translateY(-50%)', opacity:0.07, fontSize:80 }}>🏛️</div>
        <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:11, color:'var(--gold-light)', letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>
          College Companion Portal
        </div>
        <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:24, color:'#fff', marginBottom:4 }}>
          Welcome back, {user?.name}!
        </h2>
        <p style={{ opacity:0.7, fontSize:13.5 }}>
          Pingle Govt. College for Women (A), Wanapathy, Hanumakonda &nbsp;·&nbsp; {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {statCards.map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-icon"><s.icon /></div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="card" style={{ marginBottom:24 }}>
        <div className="card-header"><h3>Quick Navigation</h3></div>
        <div className="card-body">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:12 }}>
            <QuickLink icon={Megaphone} label="Announcements" to="/announcements" color="var(--royal-blue)"/>
            <QuickLink icon={BookOpen} label="Activities" to="/activities" color="var(--gold)"/>
            <QuickLink icon={FileText} label="Assignments" to="/assignments" color="#16a34a"/>
            <QuickLink icon={TrendingUp} label="Progression" to="/progression" color="#7c3aed"/>
            <QuickLink icon={AlertCircle} label="Grievances" to="/grievances" color="#dc2626"/>
            <QuickLink icon={Calendar} label="Timetable" to="/timetable" color="#0891b2"/>
            <QuickLink icon={Users} label="Faculty" to="/faculty" color="#d97706"/>
            <QuickLink icon={GraduationCap} label="Students" to="/students" color="#0f766e"/>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Announcements */}
        <div className="card">
          <div className="card-header">
            <h3>Latest Announcements</h3>
            <a href="/announcements" style={{ fontSize:12.5, color:'var(--royal-blue)' }}>View all →</a>
          </div>
          <div style={{ padding:'8px 0' }}>
            {announcements.length === 0 ? (
              <div style={{ padding:20, color:'var(--gray-400)', fontSize:13.5, textAlign:'center' }}>No announcements yet</div>
            ) : announcements.map(a => (
              <div key={a.id} style={{ padding:'12px 20px', borderBottom:'1px solid var(--gray-100)', display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--gold)',marginTop:6,flexShrink:0 }}/>
                <div>
                  <div style={{ fontWeight:500, fontSize:14 }}>{a.title}</div>
                  <div style={{ fontSize:12.5, color:'var(--gray-600)', marginTop:2 }}>
                    {a.category && <span className="badge badge-blue" style={{ marginRight:6 }}>{a.category}</span>}
                    {a.created_at && format(new Date(a.created_at), 'MMM d')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Activities</h3>
            <a href="/activities" style={{ fontSize:12.5, color:'var(--royal-blue)' }}>View all →</a>
          </div>
          <div style={{ padding:'8px 0' }}>
            {activities.length === 0 ? (
              <div style={{ padding:20, color:'var(--gray-400)', fontSize:13.5, textAlign:'center' }}>No activities yet</div>
            ) : activities.map(a => (
              <div key={a.id} style={{ padding:'12px 20px', borderBottom:'1px solid var(--gray-100)', display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--royal-blue-light)',marginTop:6,flexShrink:0 }}/>
                <div>
                  <div style={{ fontWeight:500, fontSize:14 }}>{a.title}</div>
                  <div style={{ fontSize:12.5, color:'var(--gray-600)', marginTop:2 }}>
                    {a.type && <span className="badge badge-gold" style={{ marginRight:6 }}>{a.type}</span>}
                    {a.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
