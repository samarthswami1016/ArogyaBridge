import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Stethoscope, Users, MapPin, Shield, Zap, Globe, Award } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LanguageSwitcher from '../LanguageSwitcher';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-green-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-pink-500 rounded-full blur-xl"></div>
      </div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Branding and Features */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-md mx-auto lg:max-w-none">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4 mb-8 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 rounded-full blur-md opacity-50"></div>
                <Heart className="h-14 w-14 text-red-400 relative animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ArogyaBridge
                </h1>
                <p className="text-blue-200 text-sm font-medium mt-1">Healthcare for Everyone</p>
              </div>
            </div>
            
            {/* Main Description */}
            <p className="text-xl lg:text-2xl mb-10 text-blue-100 leading-relaxed relative z-10">
              Connecting rural communities to quality healthcare through 
              <span className="text-white font-semibold"> AI-powered technology</span>
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                  <Stethoscope className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">AI-Powered Health Assistant</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Get instant medical guidance using voice input and advanced AI technology</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                  <MapPin className="h-6 w-6 text-green-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Find Nearby Healthcare</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Locate clinics, hospitals, and pharmacies with real-time information</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                  <Globe className="h-6 w-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Multi-Language Support</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Available in English, Hindi, and Marathi for wider accessibility</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                  <Shield className="h-6 w-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Emergency First Aid</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Step-by-step emergency guidance when you need it most</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 relative z-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-blue-200">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-xs text-blue-200">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-xs text-blue-200">Powered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center relative">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {isLogin ? t('auth.login') : t('auth.register')}
              </h2>
              <p className="text-gray-600 text-lg">
                {isLogin 
                  ? 'Welcome back to your health companion' 
                  : 'Join thousands improving their health'
                }
              </p>
            </div>

            {/* Auth Form Container */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
              
              {isLogin ? (
                <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;