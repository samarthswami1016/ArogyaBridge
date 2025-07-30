import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send,
  Bot,
  User,
  AlertCircle,
  CheckCircle,
  Mic,
  MicOff,
  Loader2,
  Phone,
  Clock,
  Activity,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'emergency';
}

const SymptomsPage: React.FC = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: '1',
      type: 'ai',
      content: t('symptoms.initialMessage', 'Please describe your symptoms and I’ll help you.'),
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages]);

  /* ---------------- Speech-recognition setup ---------------- */
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'hi-IN';

      rec.onstart = () => setIsListening(true);
      rec.onresult = (e: any) => {
        setInputText(e.results[0][0].transcript);
        setIsListening(false);
      };
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  /* ---------------- Gemini-powered response ---------------- */
  const generateAIResponse = async (
    symptoms: string
  ): Promise<{ response: string; severity: 'low' | 'medium' | 'high' | 'emergency' }> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        response: t('symptoms.responses.error', 'AI unavailable. Please consult a doctor.'),
        severity: 'medium',
      };
    }

    const prompt = `
You are an Indian medical assistant.  
User says: "${symptoms}"

Reply in plain English (≤ 150 words).  
End your reply with exactly one of these lines on a new line:
**emergency**  
**high**  
**medium**  
**low**
`;

    try {
      const model = 'gemini-2.0-flash';
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      const lines = text.trim().split('\n');
      const severityLine = lines.pop()?.trim().toLowerCase();
      const responseBody = lines.join('\n').trim();

      let severity: 'low' | 'medium' | 'high' | 'emergency' = 'low';
      if (severityLine === 'emergency') severity = 'emergency';
      else if (severityLine === 'high') severity = 'high';
      else if (severityLine === 'medium') severity = 'medium';

      return {
        response: responseBody || t('symptoms.responses.error', 'Unable to analyse symptoms.'),
        severity,
      };
    } catch (err) {
      console.error(err);
      return {
        response: t('symptoms.responses.error', 'Unable to analyse symptoms. Please consult a doctor.'),
        severity: 'medium',
      };
    }
  };

  /* ---------------- Handlers ---------------- */
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const { response, severity } = await generateAIResponse(content);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        severity,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: t('common.error', 'Something went wrong.'),
        timestamp: new Date(),
        severity: 'medium',
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const startListening = () => recognition && recognition.start();
  const stopListening = () => recognition && recognition.stop();

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'emergency':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Bot className="h-4 w-4 text-blue-600" />;
    }
  };

  const getSeverityBg = (severity?: string) => {
    switch (severity) {
      case 'emergency':
        return 'bg-red-50 border-red-200 shadow-red-100';
      case 'high':
        return 'bg-orange-50 border-orange-200 shadow-orange-100';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 shadow-yellow-100';
      case 'low':
        return 'bg-green-50 border-green-200 shadow-green-100';
      default:
        return 'bg-blue-50 border-blue-200 shadow-blue-100';
    }
  };

  const quickSymptoms = [
    {
      text: t('symptoms.quickSymptoms.headache', 'Headache'),
      icon: '🤕',
    },
    {
      text: t('symptoms.quickSymptoms.fever', 'Fever'),
      icon: '🤒',
    },
    {
      text: t('symptoms.quickSymptoms.cough', 'Cough'),
      icon: '😷',
    },
    {
      text: t('symptoms.quickSymptoms.stomachache', 'Stomachache'),
      icon: '😣',
    },
    {
      text: t('symptoms.quickSymptoms.breathingDifficulty', 'Breathing difficulty'),
      icon: '😮‍💨',
    },
    {
      text: t('symptoms.quickSymptoms.dizziness', 'Dizziness'),
      icon: '😵‍💫',
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {t('symptoms.title', 'Symptom Checker')}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('symptoms.subtitle', 'Describe your symptoms and get AI guidance')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">
                {t('symptoms.online', 'Online')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-500 text-white px-4 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <Phone className="h-5 w-5 animate-bounce" />
          <div className="flex-1">
            <p className="font-semibold text-sm">
              {t('symptoms.emergencyBanner', 'In an emergency, call 108 immediately!')}
            </p>
            <p className="text-xs opacity-90">
              {t('symptoms.emergencySubtext', 'ArogyaBridge is not a substitute for emergency care.')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto px-4 flex-1 flex flex-col overflow-hidden">
          {/* Quick Symptoms */}
          {messages.length <= 1 && (
            <div className="py-6 flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {t('symptoms.commonSymptoms', 'Common symptoms')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickSymptoms.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInputText(s.text)}
                    className="flex items-center space-x-2 p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-4 hide-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] sm:max-w-md p-4 rounded-2xl shadow-sm ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : `rounded-bl-md border ${getSeverityBg(msg.severity)}`
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.type === 'ai' && (
                      <div className="flex-shrink-0 mt-1">{getSeverityIcon(msg.severity)}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm whitespace-pre-wrap leading-relaxed ${
                          msg.type === 'user' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {msg.content}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p
                          className={`text-xs ${
                            msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        {msg.severity && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              msg.severity === 'emergency'
                                ? 'bg-red-100 text-red-700'
                                : msg.severity === 'high'
                                ? 'bg-orange-100 text-orange-700'
                                : msg.severity === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {t(`symptoms.severity.${msg.severity}`, msg.severity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600">
                    {t('symptoms.analyzing', 'Analyzing...')}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg flex-shrink-0">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('symptoms.inputPlaceholder', 'Describe your symptoms...')}
              className="flex-1 px-4 py-3 border rounded-2xl focus:ring-blue-500 resize-none max-h-32"
              disabled={isProcessing}
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}

            {/* Voice Button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white scale-110'
                  : isProcessing
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:scale-105'
              }`}
            >
              {isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isListening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
              {isListening && (
                <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping" />
              )}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isProcessing}
              className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          <div className="flex items-center justify-center mt-2 space-x-4">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Activity className="h-3 w-3" />
              <span>{t('symptoms.aiPowered', 'AI-powered')}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{t('symptoms.instantResponse', 'Instant response')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomsPage;