/**
 * Admin Dashboard Sidebar Navigation Component.
 * @module components/dashboard/Sidebar
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Users, BarChart3, Activity, LogOut, GraduationCap } from 'lucide-react';
import Button from '../shared/Button';

/**
 * Renders the persistent left-hand sidebar menu for the admin dashboard.
 * Includes navigational links and a logout trigger.
 * 
 * @returns {React.ReactElement} The rendered sidebar container.
 */
const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} />, end: true },
    { to: '/dashboard/leads', label: 'Leads', icon: <Users size={18} /> },
    { to: '/dashboard/funnel', label: 'Funnel', icon: <BarChart3 size={18} /> },
    { to: '/dashboard/health', label: 'Diagnostics', icon: <Activity size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  const activeLink = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-academic-navy text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-academic-navy'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between sticky top-0">
      <div className="flex flex-col gap-8 p-6">
        {/* App Title */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <img
            src="/images/scct-logo.jpg"
            alt="SCCT Logo"
            className="h-11 w-11 rounded-full object-cover shadow-sm border border-slate-100 shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-academic-navy text-xs leading-tight">Sanpada College of</span>
            <span className="font-serif font-extrabold text-academic-navy text-xs leading-tight">Commerce &amp; Tech</span>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Admin Workspace</span>
          </div>
        </div>

        {/* User Greeting */}
        {user && (
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-md">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Logged in as</span>
            <span className="text-xs font-bold text-slate-700">{user.username}</span>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={activeLink}>
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-6 border-t border-slate-100">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="md"
          className="w-full flex items-center justify-center gap-2 border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-100"
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
