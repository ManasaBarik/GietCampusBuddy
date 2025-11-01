import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import usePWAInstall from "@/hooks/usePWAInstall";

export default function InstallPrompt() {
  const { canInstall, isInstalled, installPWA } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    // Check if the prompt was previously dismissed
    if (typeof window !== 'undefined') {
      return localStorage.getItem('installPromptDismissed') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Only show the prompt if the app can be installed and hasn't been dismissed
    if (canInstall && !isInstalled && !dismissed) {
      // Small delay to ensure the UI is loaded
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [canInstall, isInstalled, dismissed]);

  const handleInstall = async () => {
    const installed = await installPWA();
    if (installed) {
      setIsVisible(false);
      setDismissed(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('installPromptDismissed', 'true');
      }
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('installPromptDismissed', 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Install Campus Buddy</h3>
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
