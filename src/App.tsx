import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AuthPage from './components/Auth/AuthPage';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import SymptomsPage from './pages/SymptomsPage';
import HistoryPage from './pages/HistoryPage';
import FirstAidPage from './pages/FirstAidPage';
import ClinicsPage from './pages/ClinicsPage';
import ProfilePage from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ArogyaBridge...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'symptoms':
      case 'voice':
        return <SymptomsPage />;
      case 'history':
        return <HistoryPage />;
      case 'firstaid':
        return <FirstAidPage />;
      case 'clinics':
        return <ClinicsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;