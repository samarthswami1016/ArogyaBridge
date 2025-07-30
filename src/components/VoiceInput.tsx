import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isProcessing?: boolean;
  compact?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, isProcessing = false, compact = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = i18n.language === 'hi' ? 'hi-IN' : 
                                i18n.language === 'mr' ? 'mr-IN' : 'en-IN';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [i18n.language, onTranscript]);

  const startListening = () => {
    if (recognition && !isListening && !isProcessing) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (!isSupported) {
    return (
      <div className={`bg-orange-50 border border-orange-200 rounded-lg ${compact ? 'p-2' : 'p-4'}`}>
        <div className="flex items-center space-x-2 text-orange-700">
          <Volume2 className="h-5 w-5" />
          <p className={`${compact ? 'text-xs' : 'text-sm'}`}>
            Voice input is not supported in your browser. Please use a modern browser like Chrome or Edge.
          </p>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={isProcessing}
        className={`relative p-2 rounded-full transition-all duration-300 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : isProcessing
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
        title={isListening ? t('voice.stopRecording') : t('voice.startRecording')}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isListening ? (
          <MicOff className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
        
        {isListening && (
          <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping"></div>
        )}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('voice.title')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('voice.description')}
        </p>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white" />
            )}
            
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            )}
          </button>

          <div className="text-center">
            {isProcessing ? (
              <p className="text-blue-600 font-medium">{t('voice.processing')}</p>
            ) : isListening ? (
              <p className="text-red-600 font-medium">{t('voice.listening')}</p>
            ) : (
              <p className="text-gray-700">
                {t('voice.startRecording')}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>Speak clearly in {i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'mr' ? 'मराठी' : 'English'}</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;