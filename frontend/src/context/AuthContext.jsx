import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mathmasterUser')); } catch { return null; }
  });

  const saveSession = account => {
    const safeUser = { id: account.id, name: account.name, email: account.email, role: account.role || 'user' };
    localStorage.setItem('mathmasterUser', JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const login = async (email, password) => {
    const { data: matches } = await api.get('/users', { params: { email: email.trim().toLowerCase() } });
    const account = matches.find(item => item.password === password);
    if (!account) throw new Error('Invalid email or password');
    return saveSession(account);
  };

  const register = async values => {
    const email = values.email.trim().toLowerCase();
    const { data: existing } = await api.get('/users', { params: { email } });
    if (existing.length) throw new Error('Email already registered');
    if (!values.name.trim() || values.password.length < 6) throw new Error('Enter your name and a password with at least 6 characters');
    const { data: account } = await api.post('/users', { name: values.name.trim(), email, password: values.password, role: 'user', createdAt: new Date().toISOString() });
    return saveSession(account);
  };

  const logout = () => { localStorage.removeItem('mathmasterUser'); setUser(null); };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
