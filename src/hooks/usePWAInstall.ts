import { useState, useEffect } from 'react';

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
};

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      return /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    };

    setIsMobile(checkIfMobile());

    // Check if the app is running as a standalone PWA
    const isInStandaloneMode = () => {
      return (
        (window.matchMedia('(display-mode: standalone)').matches) ||
        ((window.navigator as any).standalone) ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        document.referrer.includes('android-app://') ||
        window.location.search.includes('from_homescreen=true')
      );
    };

    const checkIfInstalled = () => {
      const isInstalled = isInStandaloneMode();
      setIsInstalled(isInstalled);
      return isInstalled;
    };

    // Initial check
    checkIfInstalled();

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default browser install prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      window.deferredPrompt = e; // Make it available globally for iOS
      
      // Only set canInstall to true if not in standalone mode
      if (!isInStandaloneMode()) {
        setCanInstall(true);
      }
      
      console.log('PWA install prompt was prevented and stored', e);
    };

    const handleAppInstalled = () => {
      console.log('App was installed');
      setCanInstall(false);
      setIsInstalled(true);
      // Remove the prompt if it was stored
      window.deferredPrompt = null;
    };

    // For iOS
    const checkForIOSInstallPrompt = () => {
      // Check if it's iOS
      const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
      };

      // Check if it's running in standalone mode
      const isInStandaloneMode = () => ('standalone' in window.navigator) && ((window.navigator as any).standalone);

      if (isIos() && !isInStandaloneMode()) {
        setCanInstall(true);
      }
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // For iOS
    checkForIOSInstallPrompt();
    
    // Check again after a delay to catch any race conditions
    const timer = setTimeout(() => {
      checkIfInstalled();
      // For iOS, we need to check if we can show the install prompt
      if (!isInStandaloneMode() && isMobile) {
        setCanInstall(true);
      }
    }, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [isMobile]);

  const installPWA = async () => {
    // For iOS, we need to show custom instructions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (isIOS) {
      // Show iOS installation instructions
      const iOSInstallPrompt = document.createElement('div');
      iOSInstallPrompt.style.position = 'fixed';
      iOSInstallPrompt.style.bottom = '20px';
      iOSInstallPrompt.style.left = '50%';
      iOSInstallPrompt.style.transform = 'translateX(-50%)';
      iOSInstallPrompt.style.backgroundColor = '#ffffff';
      iOSInstallPrompt.style.padding = '16px';
      iOSInstallPrompt.style.borderRadius = '8px';
      iOSInstallPrompt.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      iOSInstallPrompt.style.zIndex = '1000';
      iOSInstallPrompt.style.maxWidth = '90%';
      iOSInstallPrompt.style.textAlign = 'center';
      
      iOSInstallPrompt.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #1a1a1a;">Install Campus Buddy</h3>
        <p style="margin: 0 0 15px 0; color: #4a4a4a; font-size: 14px;">
          Tap <span style="font-weight: bold;">Share</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin: 0 2px;">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg> then <span style="font-weight: bold;">Add to Home Screen</span>
        </p>
        <button style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;" onclick="this.parentNode.remove()">
          Got it!
        </button>
      `;
      
      document.body.appendChild(iOSInstallPrompt);
      return true;
    }

    // For Android/other browsers
    if (!deferredPrompt) {
      console.error('No install prompt available');
      // Try to use the global deferredPrompt as fallback
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then(() => {
          window.deferredPrompt = null;
        });
        return true;
      }
      return false;
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // The prompt has been shown and user made a choice
      console.log(`User response to the install prompt: ${outcome}`);
      
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      window.deferredPrompt = null;
      
      // Return true if the user accepted the install prompt
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error during PWA installation:', error);
      return false;
    }
  };

  return { canInstall, isInstalled, installPWA };
};

export default usePWAInstall;
