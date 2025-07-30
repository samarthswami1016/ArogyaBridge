import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Search, Play, Clock, AlertTriangle, Phone, ChevronRight, ChevronDown } from 'lucide-react';

interface FirstAidTip {
  id: string;
  title: string;
  description: string;
  steps: string[];
  category: string;
  priority: 'low' | 'medium' | 'high';
  duration: string;
  icon: string;
}

const FirstAidPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const { t } = useTranslation();

  const firstAidTips: FirstAidTip[] = [
    {
      id: '1',
      title: t('firstaid.tips.heartAttack.title'),
      description: t('firstaid.tips.heartAttack.description'),
      steps: [
        t('firstaid.tips.heartAttack.steps.0'),
        t('firstaid.tips.heartAttack.steps.1'),
        t('firstaid.tips.heartAttack.steps.2'),
        t('firstaid.tips.heartAttack.steps.3'),
        t('firstaid.tips.heartAttack.steps.4')
      ],
      category: 'emergency',
      priority: 'high',
      duration: '2-3 ' + t('common.minutes'),
      icon: '💔'
    },
    {
      id: '2',
      title: t('firstaid.tips.bleeding.title'),
      description: t('firstaid.tips.bleeding.description'),
      steps: [
        t('firstaid.tips.bleeding.steps.0'),
        t('firstaid.tips.bleeding.steps.1'),
        t('firstaid.tips.bleeding.steps.2'),
        t('firstaid.tips.bleeding.steps.3'),
        t('firstaid.tips.bleeding.steps.4')
      ],
      category: 'injury',
      priority: 'medium',
      duration: '5-10 ' + t('common.minutes'),
      icon: '🩹'
    },
    {
      id: '3',
      title: t('firstaid.tips.burns.title'),
      description: t('firstaid.tips.burns.description'),
      steps: [
        t('firstaid.tips.burns.steps.0'),
        t('firstaid.tips.burns.steps.1'),
        t('firstaid.tips.burns.steps.2'),
        t('firstaid.tips.burns.steps.3'),
        t('firstaid.tips.burns.steps.4')
      ],
      category: 'injury',
      priority: 'high',
      duration: '15-20 ' + t('common.minutes'),
      icon: '🔥'
    },
    {
      id: '4',
      title: t('firstaid.tips.choking.title'),
      description: t('firstaid.tips.choking.description'),
      steps: [
        t('firstaid.tips.choking.steps.0'),
        t('firstaid.tips.choking.steps.1'),
        t('firstaid.tips.choking.steps.2'),
        t('firstaid.tips.choking.steps.3'),
        t('firstaid.tips.choking.steps.4')
      ],
      category: 'emergency',
      priority: 'high',
      duration: '1-2 ' + t('common.minutes'),
      icon: '🫁'
    },
    {
      id: '5',
      title: t('firstaid.tips.fainting.title'),
      description: t('firstaid.tips.fainting.description'),
      steps: [
        t('firstaid.tips.fainting.steps.0'),
        t('firstaid.tips.fainting.steps.1'),
        t('firstaid.tips.fainting.steps.2'),
        t('firstaid.tips.fainting.steps.3'),
        t('firstaid.tips.fainting.steps.4')
      ],
      category: 'common',
      priority: 'medium',
      duration: '5-10 ' + t('common.minutes'),
      icon: '😵'
    },
    {
      id: '6',
      title: t('firstaid.tips.sprain.title'),
      description: t('firstaid.tips.sprain.description'),
      steps: [
        t('firstaid.tips.sprain.steps.0'),
        t('firstaid.tips.sprain.steps.1'),
        t('firstaid.tips.sprain.steps.2'),
        t('firstaid.tips.sprain.steps.3'),
        t('firstaid.tips.sprain.steps.4')
      ],
      category: 'injury',
      priority: 'low',
      duration: '20-30 ' + t('common.minutes'),
      icon: '🦵'
    }
  ];

  const categories = [
    { id: 'all', name: t('firstaid.categories.all'), icon: '📋' },
    { id: 'emergency', name: t('firstaid.categories.emergency'), icon: '🚨' },
    { id: 'injury', name: t('firstaid.categories.injury'), icon: '🩹' },
    { id: 'common', name: t('firstaid.categories.common'), icon: '💊' }
  ];

  const filteredTips = firstAidTips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return t('firstaid.priority.high');
      case 'medium':
        return t('firstaid.priority.medium');
      case 'low':
        return t('firstaid.priority.low');
      default:
        return t('firstaid.categories.common');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{t('firstaid.title')}</h1>
                <p className="text-sm text-gray-600">{t('firstaid.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-500 text-white px-4 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <Phone className="h-5 w-5 animate-bounce" />
          <div className="flex-1">
            <p className="font-semibold text-sm">{t('firstaid.emergencyBanner')}</p>
            <p className="text-xs opacity-90">{t('firstaid.emergencySubtext')}</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('firstaid.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* First Aid Tips */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 h-full">
          {filteredTips.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Heart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('firstaid.noResults')}</h3>
              <p className="text-gray-600">{t('firstaid.noResultsDesc')}</p>
            </div>
          ) : (
          <div className="space-y-4 h-full overflow-y-auto hide-scrollbar scroll-smooth">
              {filteredTips.map((tip, index) => (
                <div
                  key={tip.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-2xl">{tip.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(tip.priority)}`}>
                              {getPriorityText(tip.priority)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{tip.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{tip.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Play className="h-3 w-3" />
                              <span>{t('firstaid.stepsCount', { count: tip.steps.length })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-2">
                        {expandedTip === tip.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Steps */}
                  {expandedTip === tip.id && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                        {t('firstaid.stepByStep')}
                      </h4>
                      <div className="space-y-3">
                        {tip.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </div>
                            <p className="text-sm text-gray-700 flex-1">{step}</p>
                          </div>
                        ))}
                      </div>
                      
                      {tip.priority === 'high' && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <p className="text-sm text-red-700 font-medium">
                              {t('firstaid.important')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstAidPage;
