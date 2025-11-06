// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

// Pages
import Home from "./Pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyCode from "./components/VerifyEmailCode";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmailCode from './components/VerifyEmailCode';

// Dashboards
import StudentDashboard from "./pages/StudentDashboard";
import BecomeTeacher from "./pages/BecomeTeacher";

// Autres pages

// Paramètres

// Admin
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import TeacherVerification from './components/admin/TeacherVerification';
import AdminManagement from './components/admin/AdminManagement';

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-code" element={<VerifyCode />} />
              <Route path="/verify-email" element={<VerifyEmailCode />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/become-teacher" element={<BecomeTeacher />} />
           
              {/* Anciennes routes protégées — maintenant publiques */}
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/search-professors" element={<SearchProfessors />} />
              <Route path="/teacher-balance" element={<TeacherBalance />} />
              <Route path="/my-courses" element={<MyCourses />} />

              {/* Admin routes (aussi publiques) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="teachers" element={<TeacherVerification />} />
                <Route path="admins" element={<AdminManagement />} />
              </Route>

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
