import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, RotateCcw, BookOpen, GraduationCap, Settings, CheckCircle, AlertTriangle, XCircle, Cpu, Zap, Target, TrendingUp, Activity } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface CalculationResult {
  currentPercentage: number;
  canBunk: number;
  needToAttend: number;
  status: "good" | "warning" | "danger";
  message: string;
}

export function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useLocalStorage<string>("attendance_totalClasses", "");
  const [attendedClasses, setAttendedClasses] = useLocalStorage<string>("attendance_attendedClasses", "");
  const [desiredPercentage, setDesiredPercentage] = useLocalStorage<string>("attendance_desiredPercentage", "80");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateAttendance = async () => {
    const total = parseInt(totalClasses);
    const attended = parseInt(attendedClasses);
    const desired = parseInt(desiredPercentage);

    if (!total || !attended || attended > total || desired <= 0 || desired > 100) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const currentPercentage = (attended / total) * 100;
    let canBunk = 0;
    let needToAttend = 0;
    let status: "good" | "warning" | "danger" = "good";
    let message = "";

    if (currentPercentage >= desired) {
      // Calculate how many classes can be bunked
      let maxBunk = 0;
      for (let bunk = 1; bunk <= 100; bunk++) {
        const newPercentage = (attended / (total + bunk)) * 100;
        if (newPercentage >= desired) {
          maxBunk = bunk;
        } else {
          break;
        }
      }
      canBunk = maxBunk;
      
      if (currentPercentage >= 90) {
        status = "good";
        message = `🚀 Excellent! You're crushing it like a true engineer! You can skip ${canBunk} classes and still maintain ${desired}% attendance.`;
      } else if (currentPercentage >= 80) {
        status = "good";
        message = `⚡ Great job! Your attendance is solid. You can afford to miss ${canBunk} classes if needed.`;
      } else {
        status = "warning";
        message = `⚠️ You're meeting the requirement, but don't get too comfortable! You can skip ${canBunk} classes max.`;
      }
    } else {
      // Calculate how many more classes needed
      let classesToAttend = 0;
      let futureClasses = 0;
      
      while (true) {
        futureClasses++;
        classesToAttend++;
        const newPercentage = ((attended + classesToAttend) / (total + futureClasses)) * 100;
        if (newPercentage >= desired) {
          needToAttend = classesToAttend;
          break;
        }
      }

      status = "danger";
      if (currentPercentage < 50) {
        message = `🔥 ALERT! Your attendance is critically low! You need to attend the next ${needToAttend} classes without fail to reach ${desired}%.`;
      } else if (currentPercentage < 70) {
        message = `⚡ Time to power up! Attend the next ${needToAttend} classes to get back to ${desired}% attendance.`;
      } else {
        message = `🎯 Almost there! Just ${needToAttend} more classes to attend and you'll hit your ${desired}% target.`;
      }
    }

    setResult({
      currentPercentage,
      canBunk,
      needToAttend,
      status,
      message
    });

    setIsCalculating(false);
  };

  const reset = () => {
    setTotalClasses("");
    setAttendedClasses("");
    setDesiredPercentage("80");
    setResult(null);
  };

  const loadExample = (total: string, attended: string, desired: string = "80") => {
    setTotalClasses(total);
    setAttendedClasses(attended);
    setDesiredPercentage(desired);
    setResult(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <CheckCircle className="w-6 h-6 text-success" />;
      case "warning": return <AlertTriangle className="w-6 h-6 text-warning" />;
      case "danger": return <XCircle className="w-6 h-6 text-danger" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 sm:space-y-6"
      >
        <motion.div
          className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-terminal shadow-terminal backdrop-blur-sm border border-primary/30 flex items-center justify-center">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </motion.div>
        
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground px-4">
            Attendance Calculator
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Track your attendance and plan your schedule effectively
          </p>
        </div>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 sm:p-6 md:p-8 bg-card backdrop-blur-sm border border-border shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                Total Classes
              </label>
              <Input
                type="number"
                placeholder="e.g., 60"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-success" />
                </div>
                Classes Attended
              </label>
              <Input
                type="number"
                placeholder="e.g., 45"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-warning" />
                </div>
                Desired %
              </label>
              <Input
                type="number"
                placeholder="80"
                value={desiredPercentage}
                onChange={(e) => setDesiredPercentage(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
            <Button
              onClick={calculateAttendance}
              disabled={isCalculating || !totalClasses || !attendedClasses}
              variant="professional"
              size="lg"
              className="w-full sm:w-auto"
            >
              {isCalculating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Calculator className="w-5 h-5" />
                </motion.div>
              ) : (
              <Calculator className="w-5 h-5 mr-2" />
              )}
              {isCalculating ? "Calculating..." : "Calculate"}
            </Button>

            <Button
              onClick={reset}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto sm:px-8"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* How to Use Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 sm:p-6 md:p-8 bg-card backdrop-blur-sm border border-border shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Enter Your Data</p>
                <p className="text-sm text-muted-foreground">Total classes conducted and classes you've attended</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-success">2</span>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Set Target %</p>
                <p className="text-sm text-muted-foreground">Your desired attendance percentage (usually 75-80%)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-warning">3</span>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Get Results</p>
                <p className="text-sm text-muted-foreground">See if you can bunk or need to attend more classes</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Progress Circle */}
            <div className="flex justify-center">
              <CircularProgress 
                percentage={result.currentPercentage}
                size={240}
                strokeWidth={12}
              />
            </div>

            {/* Status Message */}
            <Card className="p-4 sm:p-6 md:p-8 bg-card backdrop-blur-sm border border-border shadow-lg">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    result.status === 'good' ? 'bg-success/10' : 
                    result.status === 'warning' ? 'bg-warning/10' : 'bg-danger/10'
                  }`}>
                    {getStatusIcon(result.status)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base md:text-lg leading-relaxed text-foreground">
                    {result.message}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Current Status
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {Math.round(result.currentPercentage)}%
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      {result.canBunk > 0 ? "Can Skip" : "Must Attend"}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {result.canBunk > 0 ? result.canBunk : result.needToAttend}
                    </p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    result.status === 'good' ? 'bg-success/10' : 
                    result.status === 'warning' ? 'bg-warning/10' : 'bg-danger/10'
                  }`}>
                    {result.status === 'good' ? (
                      <CheckCircle className="w-7 h-7 text-success" />
                    ) : (
                      <AlertTriangle className="w-7 h-7 text-warning" />
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}