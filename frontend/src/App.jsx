import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateGuide from './pages/CreateGuide';
import GuideViewer from './pages/GuideViewer';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Settings from './pages/Settings';
import Drafts from './pages/Drafts';
import GuideList from './pages/GuideList';
import Notifications from './pages/Notifications';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

function App() {
  // Wake up Render server on load
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/guides`); // Or a specific health endpoint
      } catch (err) {
        // Ignore errors, just trying to wake it up
      }
    };
    wakeUpServer();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Routes */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="guides" element={<GuideList />} />
            <Route path="create" element={<CreateGuide />} />
            <Route path="guide/:id" element={<GuideViewer />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
