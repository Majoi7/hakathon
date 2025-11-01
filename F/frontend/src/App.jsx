// src/App.jsx - MIS À JOUR
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

//parametres
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
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

            // Dans src/App.jsx, ajoutez cette route :
<Route path="/settings" element={
  <ProtectedRoute>
    <Settings />
  </ProtectedRoute>
} />
            
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
    </AuthProvider>
  );
}

export default App;