import { motion } from "framer-motion";
import { CGPACalculator } from "@/components/CGPACalculator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CSBackground } from "@/components/CSBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CGPAPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* CS Background Animations */}
      <CSBackground />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-cyber/5 to-accent-code/5" />
      
      {/* Header with navigation */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-50 flex justify-between items-center gap-2 flex-wrap">
        <Link to="/" className="no-underline">
          <Button variant="professional" size="sm" className="pointer-events-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Home</span>
          </Button>
        </Link>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/attendance" className="no-underline">
            <Button variant="professional" size="sm" className="pointer-events-auto">
              Attendance
            </Button>
          </Link>
          <Link to="/sgpa" className="no-underline">
            <Button variant="professional" size="sm" className="pointer-events-auto">
              SGPA
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20 sm:py-24">
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
        className="relative z-10 text-center py-8 text-muted-foreground border-t border-border/50"
      >
        <p className="text-sm mb-2">
          Optimized for students
        </p>
        <div className="text-xs space-y-1">
          <p>Credits: @barik.unleashed & @SRM</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default CGPAPage;