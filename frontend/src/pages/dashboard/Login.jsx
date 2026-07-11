import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { GraduationCap, ShieldAlert, Key, User } from 'lucide-react';

const Login = () => {
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please provide username and password.');
      setLoading(false);
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Authentication failed. Check admin credentials.');
      }
    } catch (err) {
      console.error('Portal login error:', err);
      setError('Connection failed. Server might be offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full flex flex-col gap-8 bg-white p-8 rounded-lg border border-slate-200 shadow-md">
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <img
            src="/images/scct-logo.jpg"
            alt="SCCT Logo"
            className="h-16 w-16 rounded-full object-cover border-2 border-academic-gold/30 shadow-md shrink-0"
          />
          <div>
            <h2 className="text-xl font-bold font-serif text-academic-navy">Sanpada College of Commerce &amp; Technology</h2>
            <p className="text-[10px] text-academic-gold font-bold uppercase tracking-widest mt-0.5">Admin Portal</p>
            <p className="text-xs text-slate-400 mt-1">Access leads, status pipelines and analytical dashboards.</p>
          </div>
        </div>

        {/* Global errors */}
        {(error || authError) && (
          <div className="p-3 bg-rose-50 border-l-4 border-rose-600 rounded text-rose-800 text-xs flex items-center gap-2">
            <ShieldAlert className="shrink-0" size={16} />
            <span>{error || authError}</span>
          </div>
        )}

        {/* Form fields */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <User className="absolute left-3 top-[34px] text-slate-400" size={16} />
            <Input
              label="Username"
              id="username"
              type="text"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-8"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-[34px] text-slate-400" size={16} />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-8"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full mt-2 font-bold"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                Authenticating...
              </div>
            ) : (
              'Enter Admin Workspace'
            )}
          </Button>
        </form>

        <div className="text-center border-t border-slate-100 pt-4 mt-2">
          <Link to="/" className="text-xs text-slate-400 hover:text-academic-navy transition font-semibold">
            &larr; Back to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
