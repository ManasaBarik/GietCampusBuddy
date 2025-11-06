import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CSBackground } from "@/components/CSBackground";
import { Download, Smartphone, Zap, Star, ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      setIsStandalone(standalone || isIOSStandalone);
      setIsInstalled(standalone || isIOSStandalone);
    };

    checkInstalled();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      toast.success("App installed successfully!");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.error("Installation not available. Try using Chrome or Edge browser.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      toast.success("Installation started!");
    }

    setDeferredPrompt(null);
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant loading with offline support"
    },
    {
      icon: Smartphone,
      title: "Native Experience",
      description: "Works like a real mobile app"
    },
    {
      icon: Star,
      title: "Always Available",
      description: "Access from your home screen anytime"
    }
  ];

  const installSteps = {
    android: [
      "Tap the menu (⋮) in your browser",
      "Select 'Install app' or 'Add to Home screen'",
      "Tap 'Install' in the popup",
      "Launch from your home screen!"
    ],
    ios: [
      "Tap the Share button (□↑) in Safari",
      "Scroll down and tap 'Add to Home Screen'",
      "Tap 'Add' in the top right",
      "Launch from your home screen!"
    ]
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CSBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-code/5" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between p-4 md:p-6"
      >
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
        <ThemeToggle />
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Install Our App
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant access to your calculators with our Progressive Web App. 
            Works offline and loads instantly!
          </p>
        </motion.div>

        {/* Install Button Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-2 border-primary/20 shadow-terminal">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isInstalled ? "Already Installed! 🎉" : "Quick Install"}
              </CardTitle>
              <CardDescription>
                {isInstalled 
                  ? "You can now use the app from your home screen"
                  : "Add to your home screen in one click"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {isInstalled ? (
                <div className="flex items-center gap-3 text-success">
                  <Check className="w-8 h-8" />
                  <span className="text-lg font-semibold">App Installed Successfully</span>
                </div>
              ) : (
                <Button
                  variant="professional"
                  size="lg"
                  onClick={handleInstallClick}
                  disabled={!deferredPrompt}
                  className="gap-2 text-lg px-8"
                >
                  <Download className="w-5 h-5" />
                  Install Now
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Manual Installation Instructions */}
        {!isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Android Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Android / Chrome
                </CardTitle>
                <CardDescription>Follow these steps to install</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {installSteps.android.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* iOS Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  iOS / Safari
                </CardTitle>
                <CardDescription>Follow these steps to install</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {installSteps.ios.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            The app works completely offline once installed and takes up minimal storage space
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default InstallPWA;
