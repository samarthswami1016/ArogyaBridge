import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AuthPage from './components/Auth/AuthPage';
import Navigation from './components/Navigation';
import { InstallPrompt } from './components/InstallPrompt';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SymptomsPage = lazy(() => import('./pages/SymptomsPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const FirstAidPage = lazy(() => import('./pages/FirstAidPage'));
const ClinicsPage = lazy(() => import('./pages/ClinicsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

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
      <InstallPrompt />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        {renderPage()}
      </Suspense>
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