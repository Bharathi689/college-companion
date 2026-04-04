import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/me').then(r => setUser(r.data.user)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const r = await api.post('/login', { username, password });
    if (r.data.success) { setUser(r.data.user); return true; }
    return false;
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.role === 'admin' }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
