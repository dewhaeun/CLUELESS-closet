import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ClosetPage from './pages/ClosetPage';
import OutfitsPage from './pages/OutfitsPage';
import './styles/global.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/closet" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/closet" replace />} />
      <Route path="/login"   element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/signup"  element={<GuestRoute><SignupPage /></GuestRoute>} />
      <Route path="/closet"  element={<ProtectedRoute><ClosetPage /></ProtectedRoute>} />
      <Route path="/outfits" element={<ProtectedRoute><OutfitsPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
