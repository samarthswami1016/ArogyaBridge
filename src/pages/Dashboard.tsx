import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Stethoscope, 
  Mic, 
  MapPin, 
  Heart, 
  History, 
  Phone,
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  Users,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onPageChange: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onPageChange }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const quickActions = [
    {
      id: 'symptoms',
      title: t('dashboard.quickSymptomCheck'),
      description: 'Describe your symptoms and get AI-powered guidance',
      icon: Stethoscope,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'voice',
      title: t('dashboard.voiceInput'),
      description: 'Use voice to describe your health concerns',
      icon: Mic,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 'clinics',
      title: t('dashboard.findClinics'),
      description: 'Locate healthcare facilities near you',
      icon: MapPin,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 'firstaid',
      title: t('dashboard.firstAid'),
      description: 'Emergency first aid tips and guidance',
      icon: Heart,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  const statsCards = [
    {
      title: 'Health Consultations',
      value: '12',
      icon: Stethoscope,
      change: '+3 this month',
      color: 'text-blue-600',
      bg: 'bg-white',
      border: 'border-gray-200'
    },
    {
      title: 'Nearby Clinics',
      value: '8',
      icon: MapPin,
      change: 'Within 5km',
      color: 'text-green-600',
      bg: 'bg-white',
      border: 'border-gray-200'
    },
    {
      title: 'Emergency Contacts',
      value: '3',
      icon: Phone,
      change: 'Ready to call',
      color: 'text-orange-600',
      bg: 'bg-white',
      border: 'border-gray-200'
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: Heart,
      change: '+5% improvement',
      color: 'text-red-600',
      bg: 'bg-white',
      border: 'border-gray-200'
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-y-auto hide-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome', { name: user?.user_metadata?.full_name || t('common.user') })}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 mb-8 rounded-xl shadow-lg">
          <div className="flex items-center">
            <Phone className="h-6 w-6 mr-3 animate-pulse" />
            <div>
              <p className="font-bold text-lg">{t('dashboard.emergencyAlert')}</p>
              <p className="text-red-100 text-sm">{t('dashboard.emergencySubtext')}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`${stat.bg} ${stat.border} border rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 hover:scale-105`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className={`text-sm ${stat.color} font-medium`}>{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{t(`dashboard.stats.${stat.title.toLowerCase().replace(/\s+/g, '')}`)}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">{t('dashboard.quickServices')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onPageChange(action.id)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-100"
                >
                  <div className={`${action.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${action.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('dashboard.recentActivity')}</h2>
            <button
              onClick={() => onPageChange('history')}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {t('dashboard.viewFullHistory')}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{t('dashboard.activities.symptomCheck')}</p>
                <p className="text-sm text-gray-600">{t('dashboard.activities.symptomCheckDesc')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{t('dashboard.activities.clinicsFound')}</p>
                <p className="text-sm text-gray-600">{t('dashboard.activities.clinicsFoundDesc')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{t('dashboard.activities.contactUpdated')}</p>
                <p className="text-sm text-gray-600">{t('dashboard.activities.contactUpdatedDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;