import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../shared/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/placements', label: 'Placements' },
    { to: '/faculty', label: 'Faculty' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const activeStyle = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 border-b-2 py-1 ${
      isActive 
        ? 'text-academic-maroon border-academic-maroon' 
        : 'text-academic-navy border-transparent hover:text-academic-maroon'
    }`;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/scct-logo.jpg"
                alt="SCCT Logo"
                className="h-11 w-11 rounded-full object-cover shadow-sm border border-slate-100"
              />
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-academic-navy text-sm leading-tight tracking-tight">Sanpada College of</span>
                <span className="font-serif font-extrabold text-academic-navy text-sm leading-tight tracking-tight">Commerce &amp; Technology</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={activeStyle}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/admissions">
              <Button variant="primary" size="sm">
                Apply Online
              </Button>
            </Link>
            <Link to="/dashboard/login">
              <Button variant="outline" size="sm">
                Portal
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-academic-navy hover:text-academic-maroon p-2 rounded focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-50 border-b border-slate-200 animate-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-semibold ${
                    isActive
                      ? 'bg-academic-navy text-white'
                      : 'text-academic-navy hover:bg-slate-100 hover:text-academic-maroon'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-200 flex flex-col gap-2 px-3">
              <Link to="/admissions" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Apply Online
                </Button>
              </Link>
              <Link to="/dashboard/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="md" className="w-full">
                  Portal Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
