import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import { usePageViewTracker } from '../../hooks/usePageViewTracker';
import { captureUtmParameters } from '../../utils/utmCapture';

const PublicLayout = () => {
  // Capture marketing UTM parameters on mount (Home or Admissions pages)
  useEffect(() => {
    captureUtmParameters();
  }, []);

  // Track page views silently to the backend API on route changes
  usePageViewTracker();

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf8f2] text-slate-800">
      {/* Brand Header Navbar */}
      <Navbar />

      {/* Main Public Page outlets */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
