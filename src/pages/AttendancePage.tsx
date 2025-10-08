import { motion } from "framer-motion";
import { AttendanceCalculator } from "@/components/AttendanceCalculator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CSBackground } from "@/components/CSBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AttendancePage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* CS Background Animations */}
      <CSBackground />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-cyber/5 to-accent-code/5" />
      
      {/* Header with navigation */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-10 flex justify-between items-center gap-2 flex-wrap">
        <Link to="/">
          <Button variant="outline" size="sm" className="font-mono text-xs sm:text-sm">
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Home</span>
            <span className="sm:hidden">←</span>
          </Button>
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/cgpa">
            <Button variant="outline" size="sm" className="font-mono text-xs sm:text-sm">
              <span className="hidden sm:inline">CGPA Calculator</span>
              <span className="sm:hidden">CGPA</span>
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
          <AttendanceCalculator />
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 text-center py-8 text-muted-foreground border-t border-glass-border/30 font-mono text-xs"
      >
        <p className="text-sm mb-2">
          <span className="text-primary">{"// "}</span>
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

export default AttendancePage;