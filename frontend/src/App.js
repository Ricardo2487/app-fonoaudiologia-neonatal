import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@/App.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import TherapistDashboard from './pages/TherapistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ExercisesPage from './pages/ExercisesPage';
import CreateTherapyPlan from './pages/CreateTherapyPlan';
import CreatePatient from './pages/CreatePatient';
import ProgressDiary from './pages/ProgressDiary';
import { authService } from './utils/auth';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    // Handle OAuth callback
    const hash = window.location.hash;
    if (hash && hash.includes('session_id=')) {
      const sessionId = hash.split('session_id=')[1].split('&')[0];
      handleOAuthCallback(sessionId);
    }
  }, [location]);

  const handleOAuthCallback = async (sessionId) => {
    setLoading(true);
    try {
      await authService.processSession(sessionId);
      // Remove hash from URL
      window.history.replaceState(null, '', window.location.pathname);
      await checkAuth();
      navigate('/dashboard');
    } catch (error) {
      console.error('OAuth error:', error);
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const userData = await authService.getMe();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = async () => {
    await checkAuth();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/dashboard" /> : <LandingPage onShowAuth={() => navigate('/auth')} />
          } 
        />
        <Route 
          path="/auth" 
          element={
            user ? <Navigate to="/dashboard" /> : <AuthPage onSuccess={handleAuthSuccess} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            user ? (
              <main className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
                {user.role === 'therapist' || user.role === 'admin' ? (
                  <TherapistDashboard user={user} />
                ) : (
                  <PatientDashboard user={user} />
                )}
              </main>
            ) : (
              <Navigate to="/auth" />
            )
          } 
        />
        <Route 
          path="/exercises" 
          element={
            user ? (
              <main className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
                <ExercisesPage user={user} />
              </main>
            ) : (
              <Navigate to="/auth" />
            )
          } 
        />
        <Route 
          path="/appointments" 
          element={
            user ? (
              <main className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
                <div className="text-center py-20">
                  <h1 className="text-3xl font-bold mb-4">Minhas Consultas</h1>
                  <p className="text-gray-600 dark:text-gray-400">Em desenvolvimento...</p>
                </div>
              </main>
            ) : (
              <Navigate to="/auth" />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
