import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Stethoscope, 
  History, 
  Heart, 
  MapPin, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const { t } = useTranslation();

  const navigationItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home },
    { id: 'symptoms', label: t('nav.symptoms'), icon: Stethoscope },
    { id: 'history', label: t('nav.history'), icon: History },
    { id: 'firstaid', label: t('nav.firstaid'), icon: Heart },
    { id: 'clinics', label: t('nav.clinics'), icon: MapPin },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-red-400 animate-pulse" />
                <span className="text-xl font-bold">ArogyaBridge</span>
              </div>
              
              <div className="flex space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onPageChange(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === item.id
                          ? 'bg-white/20 text-white'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">{t('nav.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white shadow-lg">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-400 animate-pulse" />
              <span className="text-xl font-bold">ArogyaBridge</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-blue-500">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors mt-4"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">{t('nav.logout')}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;