/**
 * Public Global Footer Component.
 * @module components/public/Footer
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

/**
 * The standard footer displayed across all public-facing pages.
 * Includes institution branding, quick navigational links, and contact information.
 * 
 * @returns {React.ReactElement} The rendered global footer component.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-academic-navy text-slate-300 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/scct-logo.jpg"
                alt="SCCT Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-academic-gold/40 shadow"
              />
              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-white text-base leading-tight">
                  Sanpada College of
                </span>
                <span className="font-serif font-extrabold text-white text-base leading-tight">
                  Commerce &amp; Technology
                </span>
                <span className="text-[10px] text-academic-gold font-bold tracking-widest uppercase mt-0.5">SCCT</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Sanpada College of Commerce &amp; Technology (SCCT) is committed to building academic excellence and ethical standards in commerce and technological streams.
            </p>
            <p className="text-[10px] text-slate-500">
              © {currentYear} SCCT. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses" className="hover:text-academic-gold transition">Our Programs</Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-academic-gold transition">Admissions Process</Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-academic-gold transition">Placement Statistics</Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-academic-gold transition">Faculty Directory</Link>
              </li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Contact Info</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-academic-gold shrink-0 mt-0.5" />
                <span>Plot No. 3,4,5, Sector 2, Sanpada (W),<br />Behind Sanpada Railway Station,<br />Navi-Mumbai – 400705</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-academic-gold shrink-0" />
                <a href="mailto:supportscct@gmail.com" className="hover:text-white transition">
                  supportscct@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
