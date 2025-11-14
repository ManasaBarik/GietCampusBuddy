import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import AttendancePage from "./pages/AttendancePage";
import CGPAPage from "./pages/CGPAPage";
import SGPAPage from "./pages/SGPAPage";
import InstallPWA from "./pages/InstallPWA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// FAQ section added to homepage for SEO

const App = () => (
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
          <Route path="/install" element={<InstallPWA />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
