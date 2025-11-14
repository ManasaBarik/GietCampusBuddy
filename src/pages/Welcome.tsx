import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CSBackground } from "@/components/CSBackground";
import { Calculator, TrendingUp, Terminal, Code, ArrowRight, Braces, GraduationCap, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import FAQ from "@/components/FAQ";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Welcome = () => {
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearAllData = () => {
    // Clear all localStorage keys related to calculators
    const keysToRemove = [
      'attendance_totalClasses',
      'attendance_attendedClasses',
      'attendance_desiredPercentage',
      'sgpa_branch',
      'sgpa_semester',
      'sgpa_subjects',
      'cgpa_completedSemesters',
      'cgpa_sgpaValues',
      'cgpa_goalCGPA'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    setShowClearDialog(false);
    toast.success("All saved calculator data has been cleared!");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* CS Background Animations */}
      <CSBackground />
      
      {/* Terminal-style background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-cyber/5 to-accent-code/5" />
      
      {/* Terminal window mockup in background - professional styling */}
      <div className="absolute top-20 left-10 w-72 h-44 border border-primary/25 rounded-lg bg-card/80 backdrop-blur-md p-3 font-mono text-xs text-primary/40 hidden lg:block shadow-terminal pointer-events-none">
        <div className="flex gap-1.5 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        </div>
        <div className="space-y-2">
          <div>$ student_portal.init()</div>
          <div className="text-success/50">✓ System ready</div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-primary/60">→</span>
            <motion.span 
              className="text-primary/70"
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              _
            </motion.span>
          </div>
        </div>
      </div>
      
      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full space-y-8 sm:space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center space-y-3 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto w-14 h-14 sm:w-20 sm:h-20 bg-gradient-terminal rounded-xl flex items-center justify-center shadow-terminal border border-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <Terminal className="w-7 h-7 sm:w-10 sm:h-10 text-white relative z-10" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/60"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-2 sm:space-y-4 px-4"
            >
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-mono tracking-tight leading-tight">
                <Code className="inline-block w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1 text-primary" />{" "}
                Student.Campus()<span className="text-primary/60 animate-terminal-blink">_</span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                <span className="font-mono text-primary/80">{"{ "}</span>
                Your professional companion for academic excellence
                <span className="font-mono text-primary/80">{" }"}</span>
                <br className="hidden sm:block" />
                <span className="text-xs sm:text-sm opacity-70 font-mono block mt-1">// Calculate. Predict. Optimize.</span>
              </p>
            </motion.div>
            
            {/* Install PWA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center"
            >
              <Link to="/install">
                <Button variant="outline" size="lg" className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                  <Terminal className="w-5 h-5" />
                  Install App
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Calculator Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 px-2 sm:px-0"
          >
            {/* Attendance Calculator Card */}
            <Card className="group bg-card/60 backdrop-blur-md border-2 border-border shadow-lg hover:shadow-terminal transition-all duration-500 hover:scale-[1.02] hover:border-primary/60 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-terminal border-b-2 border-border/50 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-xs font-mono text-foreground/70 ml-2">attendance.calc</span>
              </div>
              <CardHeader className="text-center space-y-3 pb-4 pt-12 sm:pt-14">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-terminal rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-terminal border-2 border-primary/40">
                  <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  Attendance Calculator
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                  Calculate skippable classes or required attendance with precision.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground bg-muted/30 p-3 sm:p-5 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="text-success text-lg">✓</span>
                    <span>Track percentage in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span>Calculate safe skip count</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent-terminal text-lg">✓</span>
                    <span>Find classes needed for target</span>
                  </div>
                </div>
                <Link to="/attendance" className="block">
                  <Button variant="terminal" className="w-full text-sm sm:text-base py-5 sm:py-6 font-mono group-hover:shadow-terminal">
                    <Terminal className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Execute Calculator</span>
                    <span className="sm:hidden">Open Calculator</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* SGPA Calculator Card */}
            <Card className="group bg-card/60 backdrop-blur-md border-2 border-border shadow-lg hover:shadow-terminal transition-all duration-500 hover:scale-[1.02] hover:border-primary/60 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-terminal border-b-2 border-border/50 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-xs font-mono text-foreground/70 ml-2">sgpa.calculate</span>
              </div>
              <CardHeader className="text-center space-y-3 pb-4 pt-12 sm:pt-14">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-terminal rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-terminal border-2 border-primary/40">
                  <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  SGPA Calculator
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                  Calculate semester-wise SGPA with subject-level precision.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground bg-muted/30 p-3 sm:p-5 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="text-success text-lg">✓</span>
                    <span>Select branch & semester</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span>Custom subject credits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent-terminal text-lg">✓</span>
                    <span>Grade-based calculation</span>
                  </div>
                </div>
                <Link to="/sgpa" className="block">
                  <Button variant="terminal" className="w-full text-sm sm:text-base py-5 sm:py-6 font-mono group-hover:shadow-terminal">
                    <GraduationCap className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Execute Calculator</span>
                    <span className="sm:hidden">Open Calculator</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CGPA Calculator Card */}
            <Card className="group bg-card/60 backdrop-blur-md border-2 border-border shadow-lg hover:shadow-terminal transition-all duration-500 hover:scale-[1.02] hover:border-primary/60 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-terminal border-b-2 border-border/50 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-xs font-mono text-foreground/70 ml-2">cgpa.compute</span>
              </div>
              <CardHeader className="text-center space-y-3 pb-4 pt-12 sm:pt-14">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-terminal rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-terminal border-2 border-primary/40">
                  <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  CGPA Calculator
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                  Calculate current CGPA and predict required SGPA for your goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground bg-muted/30 p-3 sm:p-5 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="text-success text-lg">✓</span>
                    <span>Compute from all semesters</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span>Predict required SGPA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent-terminal text-lg">✓</span>
                    <span>Supports semesters 1-7</span>
                  </div>
                </div>
                <Link to="/cgpa" className="block">
                  <Button variant="terminal" className="w-full text-sm sm:text-base py-5 sm:py-6 font-mono group-hover:shadow-code">
                    <Braces className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Execute Calculator</span>
                    <span className="sm:hidden">Open Calculator</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-card/60 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border-2 border-border shadow-lg text-center overflow-hidden relative mx-4 sm:mx-0"
          >
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold">
                Why Choose This Portal?
              </h3>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Designed for students who think strategically. Our tools help you optimize your academic performance 
              through data-driven insights, ensuring you achieve success while managing your time effectively.
            </p>
            <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-4 flex-wrap">
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/40 rounded-lg text-xs sm:text-sm font-medium text-primary">Data-Driven</span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent-terminal/10 border border-accent-terminal/40 rounded-lg text-xs sm:text-sm font-medium text-accent-terminal">Optimized</span>
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-success/10 border border-success/40 rounded-lg text-xs sm:text-sm font-medium text-success">Student-First</span>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <FAQ />
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 text-center py-8 text-muted-foreground border-t border-border/50"
      >
        <p className="text-sm mb-2">
          Built for students who strive for excellence
        </p>
        <div className="text-xs space-y-3">
          <p>Credits: @barik.unleashed & @SRM</p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
          
          {/* Clear All Data Button */}
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowClearDialog(true)}
              className="text-xs text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-3 h-3 mr-1.5" />
              Clear All Saved Data
            </Button>
          </div>
        </div>
      </motion.footer>

      {/* Clear Data Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Saved Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your saved calculator data including:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Attendance calculator inputs</li>
                <li>SGPA calculator inputs (subjects, credits, grades)</li>
                <li>CGPA calculator inputs (semester data)</li>
              </ul>
              <p className="mt-3 font-semibold">This action cannot be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleClearAllData}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Clear All Data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Welcome;