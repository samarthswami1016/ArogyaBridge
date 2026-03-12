import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowBanner(false);
        }
    };

    const handleClose = () => {
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50 animate-fade-in flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <Download className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">Install ArogyaBridge App</h3>
                    <p className="text-sm text-gray-600">Install this application on your device for quick access and offline capabilities.</p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
                <button
                    onClick={handleInstall}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                    Install
                </button>
            </div>
        </div>
    );
};
