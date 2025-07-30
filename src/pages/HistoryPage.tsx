import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Stethoscope, AlertCircle, CheckCircle, Trash2, Eye, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HistoryRecord {
  id: string;
  symptoms: string;
  ai_response: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  created_at: string;
}

const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'emergency'>('all');
  const { t } = useTranslation();
  const { user } = useAuth();

  useEffect(() => {
    // Mock data - replace with actual Supabase query
    const mockRecords: HistoryRecord[] = [
      {
        id: '1',
        symptoms: t('symptoms.quickSymptoms.headache') + ' और हल्का ' + t('symptoms.quickSymptoms.fever'),
        ai_response: t('symptoms.responses.low'),
        severity: 'low',
        created_at: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        symptoms: 'तेज़ ' + t('symptoms.quickSymptoms.stomachache') + ' और उल्टी',
        ai_response: t('symptoms.responses.high'),
        severity: 'high',
        created_at: '2024-01-19T15:45:00Z'
      },
      {
        id: '3',
        symptoms: 'हल्की ' + t('symptoms.quickSymptoms.cough'),
        ai_response: t('symptoms.responses.low'),
        severity: 'low',
        created_at: '2024-01-18T09:15:00Z'
      },
      {
        id: '4',
        symptoms: t('symptoms.quickSymptoms.breathingDifficulty'),
        ai_response: t('symptoms.responses.emergency'),
        severity: 'emergency',
        created_at: '2024-01-17T20:30:00Z'
      }
    ];
    setRecords(mockRecords);
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Stethoscope className="h-5 w-5 text-blue-600" />;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'emergency':
        return t('symptoms.severity.emergency');
      case 'high':
        return t('symptoms.severity.high');
      case 'medium':
        return t('symptoms.severity.medium');
      case 'low':
        return t('symptoms.severity.low');
      default:
        return t('common.loading');
    }
  };

  const filteredRecords = records.filter(record => 
    filter === 'all' || record.severity === filter
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{t('history.title')}</h1>
                <p className="text-sm text-gray-600">{t('history.subtitle')}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredRecords.length} {t('history.records')}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { key: 'all', label: t('history.filters.all'), count: records.length },
              { key: 'emergency', label: t('history.filters.emergency'), count: records.filter(r => r.severity === 'emergency').length },
              { key: 'high', label: t('history.filters.high'), count: records.filter(r => r.severity === 'high').length },
              { key: 'medium', label: t('history.filters.medium'), count: records.filter(r => r.severity === 'medium').length },
              { key: 'low', label: t('history.filters.low'), count: records.filter(r => r.severity === 'low').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filter === tab.key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  filter === tab.key ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 h-full">
          {filteredRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Calendar className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('history.noRecords')}</h3>
              <p className="text-gray-600">{t('history.noRecordsDesc')}</p>
            </div>
          ) : (
            <div className="space-y-4 h-full overflow-y-auto hide-scrollbar">
              {filteredRecords.map((record, index) => (
                <div
                  key={record.id}
                  className={`border rounded-xl p-4 transition-all duration-300 hover:shadow-md cursor-pointer ${getSeverityBg(record.severity)}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getSeverityIcon(record.severity)}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {record.symptoms.length > 50 
                            ? `${record.symptoms.substring(0, 50)}...` 
                            : record.symptoms
                          }
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {formatDate(record.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.severity === 'emergency' ? 'bg-red-100 text-red-700' :
                        record.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                        record.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {getSeverityText(record.severity)}
                      </span>
                      <Eye className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {record.ai_response.length > 100 
                      ? `${record.ai_response.substring(0, 100)}...` 
                      : record.ai_response
                    }
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getSeverityIcon(selectedRecord.severity)}
                  <h2 className="text-lg font-bold text-gray-900">{t('history.detailedReport')}</h2>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('history.symptoms')}</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedRecord.symptoms}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('history.aiSuggestion')}</h3>
                  <p className="text-gray-700 bg-blue-50 p-3 rounded-lg whitespace-pre-wrap">
                    {selectedRecord.ai_response}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">{t('history.date')}</p>
                    <p className="font-medium">{formatDate(selectedRecord.created_at)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedRecord.severity === 'emergency' ? 'bg-red-100 text-red-700' :
                    selectedRecord.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                    selectedRecord.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {getSeverityText(selectedRecord.severity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;