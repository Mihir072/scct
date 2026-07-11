import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800">
      {/* Navigation sidebar */}
      <Sidebar />

      {/* Main content body scroll */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
