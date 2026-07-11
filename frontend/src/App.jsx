import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

// Layout wrappers
import PublicLayout from './pages/public/PublicLayout';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import ProtectedRoute from './components/dashboard/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import CourseDetail from './pages/public/CourseDetail';
import Admissions from './pages/public/Admissions';
import Placements from './pages/public/Placements';
import Faculty from './pages/public/Faculty';
import Contact from './pages/public/Contact';
import ThankYou from './pages/public/ThankYou';

// Admin / Dashboard pages
import Login from './pages/dashboard/Login';
import DashboardHome from './pages/dashboard/DashboardHome';
import SiteHealth from './pages/dashboard/SiteHealth';
import Leads from './pages/dashboard/Leads';
import Funnel from './pages/dashboard/Funnel';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routing Section */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:slug" element={<CourseDetail />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="placements" element={<Placements />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="contact" element={<Contact />} />
            <Route path="thank-you" element={<ThankYou />} />
          </Route>

          {/* Admin Authentication Gate */}
          <Route path="/dashboard/login" element={<Login />} />

          {/* Protected Administrative Layout console */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="leads" element={<Leads />} />
            <Route path="funnel" element={<Funnel />} />
            <Route path="health" element={<SiteHealth />} />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
