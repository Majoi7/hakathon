// src/App.jsx - VERSION CORRIGÉE
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";

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
import TeacherDashboard from "./pages/TeacherDashboard";
import BecomeTeacher from "./pages/BecomeTeacher";

// Autres pages
import SearchProfessors from "./pages/SearchProfessors";
import TeacherBalance from "./pages/TeacherBalance";
import MyCourses from "./pages/MyCourses";

// Paramètres
import Settings from "./pages/Settings";

// Admin
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import TeacherVerification from './components/admin/TeacherVerification';
import AdminManagement from './components/admin/AdminManagement';

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider> {/* AJOUTEZ AdminAuthProvider ICI */}
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

              {/* Routes protégées - Étudiant */}
              <Route path="/student-dashboard" element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />

              {/* Routes Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="teachers" element={<TeacherVerification />} />
                <Route path="admins" element={<AdminManagement />} />
              </Route>
              
              {/* Routes protégées - Professeur */}
              <Route path="/teacher-dashboard" element={
                <ProtectedRoute>
                  <TeacherDashboard />
                </ProtectedRoute>
              } />

              {/* Routes communes */}
              <Route path="/search-professors" element={
                <ProtectedRoute>
                  <SearchProfessors />
                </ProtectedRoute>
              } />

              <Route path="/teacher-balance" element={
                <ProtectedRoute>
                  <TeacherBalance />
                </ProtectedRoute>
              } />

              <Route path="/my-courses" element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              } />

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AdminAuthProvider> {/* FERMETURE AdminAuthProvider */}
    </AuthProvider>
  );
}

export default App;