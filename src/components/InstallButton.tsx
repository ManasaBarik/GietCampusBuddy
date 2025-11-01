import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import usePWAInstall from "@/hooks/usePWAInstall";

export default function InstallButton() {
  const { canInstall, isInstalled, installPWA } = usePWAInstall();

  const handleInstallClick = async () => {
    if (canInstall) {
      const installed = await installPWA();
      if (installed) {
        // Optionally track the installation
        console.log('App installed successfully');
      }
    }
  };

  if (!canInstall || isInstalled) {
    return null;
  }

  return (
    <Button 
      onClick={handleInstallClick}
      className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full h-14 w-14 p-0 flex items-center justify-center"
      size="icon"
      variant="default"
      aria-label="Install App"
    >
      {isInstalled ? (
        <Check className="h-6 w-6" />
      ) : (
        <Download className="h-6 w-6" />
      )}
      <span className="sr-only">
        {isInstalled ? 'Installed' : 'Install App'}
      </span>
    </Button>
  );
}
