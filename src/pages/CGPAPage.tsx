import { motion } from "framer-motion";
import { CGPACalculator } from "@/components/CGPACalculator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EngineeringBackground } from "@/components/EngineeringBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CGPAPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Engineering Background Animations */}
      <EngineeringBackground />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent-violet/3 to-accent-emerald/3" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-neural opacity-10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-tech opacity-15 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-neural opacity-5 rounded-full blur-3xl" />
      
      {/* Header with navigation */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center">
        <Link to="/">
          <Button variant="outline" className="border-tech hover:bg-tech/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/attendance">
            <Button variant="outline" className="border-tech hover:bg-tech/10">
              Attendance Calculator
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CGPACalculator />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 text-center py-8 text-muted-foreground"
      >
        <p className="text-sm mb-2">
          Built for engineering students who love to optimize everything! 🚀
        </p>
        <div className="text-xs space-y-1">
          <p>Credits: @barik.unleashed & @SRM</p>
          <p>© {new Date().getFullYear()} All rights reserved </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default CGPAPage;