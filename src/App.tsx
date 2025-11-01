import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import AttendancePage from "./pages/AttendancePage";
import CGPAPage from "./pages/CGPAPage";
import SGPAPage from "./pages/SGPAPage";
import NotFound from "./pages/NotFound";
import InstallButton from "@/components/InstallButton";
import { register as registerServiceWorker } from "@/utils/serviceWorkerRegistration";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Register service worker (will only register in production builds)
    registerServiceWorker({
      onSuccess: (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      onUpdate: (registration) => {
        console.log('New content is available and will be used when all tabs are closed.');
        // You can add a toast or notification here to inform the user about the update
        if (registration && registration.waiting) {
          if (window.confirm('A new version is available! Would you like to update now?')) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/cgpa" element={<CGPAPage />} />
            <Route path="/sgpa" element={<SGPAPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <InstallButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
