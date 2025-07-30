import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Stethoscope, Users, MapPin } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LanguageSwitcher from '../LanguageSwitcher';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Branding and Features */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto lg:max-w-none">
            <div className="flex items-center space-x-3 mb-8">
              <Heart className="h-12 w-12 text-red-400" />
              <h1 className="text-3xl lg:text-4xl font-bold">ArogyaBridge</h1>
            </div>
            
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Connecting rural communities to quality healthcare through technology
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Stethoscope className="h-6 w-6 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered Health Assistant</h3>
                  <p className="text-blue-100">Get instant medical guidance using voice input and advanced AI</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Find Nearby Healthcare</h3>
                  <p className="text-blue-100">Locate clinics, hospitals, and pharmacies in your area</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Multi-Language Support</h3>
                  <p className="text-blue-100">Available in English, Hindi, and Marathi for wider accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? t('auth.login') : t('auth.register')}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Access your health companion' 
                  : 'Create your account to get started'
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              {isLogin ? (
                <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;