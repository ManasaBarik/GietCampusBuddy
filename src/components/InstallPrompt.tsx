import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, Download, Smartphone } from 'lucide-react';
import usePWAInstall from "@/hooks/usePWAInstall";

const isIOS = () => {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    (window.matchMedia('(display-mode: standalone)').matches) ||
    ((window.navigator as any).standalone) ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    document.referrer.includes('android-app://') ||
    window.location.search.includes('from_homescreen=true')
  );
};

export default function InstallPrompt() {
  const { canInstall, isInstalled, installPWA } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Check if user is on a mobile device
    const checkIfMobile = () => {
      if (typeof window === 'undefined') return false;
      const userAgent = navigator.userAgent || navigator.vendor;
      return /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    };

    setIsMobile(checkIfMobile());
    setIsIOSDevice(isIOS());

    // Check if the prompt was previously dismissed
    const wasDismissed = localStorage.getItem('installPromptDismissed') === 'true';
    setDismissed(wasDismissed);

    // Check if the app is already installed
    if (isStandalone()) {
      setDismissed(true);
      return;
    }

    // Only show the prompt if the app can be installed and hasn't been dismissed
    if ((canInstall || isMobile) && !isInstalled && !wasDismissed) {
      // Small delay to ensure the UI is loaded
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [canInstall, isInstalled, isMobile]);

  const handleInstall = async () => {
    const installed = await installPWA();
    if (installed) {
      setIsVisible(false);
      setDismissed(true);
      localStorage.setItem('installPromptDismissed', 'true');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (!isVisible || isStandalone()) return null;

  // For iOS, show custom installation instructions
  if (isIOSDevice) {
    return (
      <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
            <Smartphone className="w-5 h-5 mr-2" />
            Install Campus Buddy
          </h3>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          To install this app on your device, tap the <span className="font-semibold">Share</span> button
          <svg
            className="inline-block w-4 h-4 mx-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          and select <span className="font-semibold">Add to Home Screen</span>.
        </p>
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDismiss}
            className="text-sm"
          >
            Not Now
          </Button>
          <Button
            size="sm"
            onClick={handleInstall}
            className="text-sm"
          >
            Show Me How
          </Button>
        </div>
      </div>
    );
  }

  // For Android/other devices
  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Install Campus Buddy
        </h3>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Add Campus Buddy to your home screen for quick access and an app-like experience.
      </p>
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDismiss}
          className="text-sm"
        >
          Not Now
        </Button>
        <Button
          size="sm"
          onClick={handleInstall}
          className="text-sm"
        >
          Install
        </Button>
      </div>
    </div>
  );
}
