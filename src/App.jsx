import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import AdminDashboard from './pages/AdminDashboard';
import CareerLibrary from './pages/CareerLibrary';
import Counselors from './pages/Counselors';
import CareerAssessment from './pages/CareerAssessment';
import MySessions from './pages/MySessions';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider, useAppContext } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content" style={{ background: '#f9fafb', minHeight: 'calc(100vh - 70px)' }}>
            <Routes>
              {/* Public Route */}
              <Route path="/signin" element={<SignIn />} />

              {/* Protected Routes (require login) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/careers" element={<CareerLibrary />} />
                <Route path="/counselors" element={<Counselors />} />
                <Route path="/assessment" element={<CareerAssessment />} />
                <Route path="/my-sessions" element={<MySessions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/resources" element={<Resources />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
