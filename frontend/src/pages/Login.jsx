import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(form.username, form.password);
    setLoading(false);
    if (ok) { toast.success('Welcome back!'); navigate('/'); }
    else toast.error('Invalid credentials');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="emblem">🏛️</div>
          <h1>Pingle Govt. College for Women (A)</h1>
          <p>Wanapathy, Hanumakonda — College Companion</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-control" value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="admin / student" autoFocus/>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position:'relative' }}>
              <input className="form-control" type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Enter password" style={{ paddingRight:40 }}/>
              <button type="button" onClick={() => setShowPwd(v => !v)}
                style={{ position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--gray-400)' }}>
                {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>
          <button className="btn btn-primary w-full" type="submit" disabled={loading}
            style={{ width:'100%', justifyContent:'center', padding:'11px', marginTop:8 }}>
            <LogIn size={16}/>{loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop:20, padding:14, background:'var(--gray-50)', borderRadius:'var(--radius-sm)', fontSize:12.5, color:'var(--gray-600)' }}>
          <strong>Demo credentials:</strong><br/>
          Admin: <code>admin</code> / <code>admin123</code><br/>
          Student: <code>student</code> / <code>student123</code>
        </div>
      </div>
    </div>
  );
}
