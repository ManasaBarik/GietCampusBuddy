import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, RotateCcw, BookOpen, GraduationCap, Settings, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { CircularProgress } from "./CircularProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface CalculationResult {
  currentPercentage: number;
  canBunk: number;
  needToAttend: number;
  status: "good" | "warning" | "danger";
  message: string;
}

export function AttendanceCalculator() {
  const [totalClasses, setTotalClasses] = useState<string>("");
  const [attendedClasses, setAttendedClasses] = useState<string>("");
  const [desiredPercentage, setDesiredPercentage] = useState<string>("80");
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
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary shadow-glass"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Settings className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Attendance Calculator
          </h1>
          <p className="text-muted-foreground text-lg">
            Calculate your attendance like a pro engineer! 🔧
          </p>
        </div>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 bg-gradient-glass backdrop-blur-sm border border-glass-border shadow-glass">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-foreground">
                <BookOpen className="w-4 h-4 mr-2 text-primary" />
                Total Classes
              </label>
              <Input
                type="number"
                placeholder="e.g., 60"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value)}
                className="bg-card/50 border-border backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-foreground">
                <GraduationCap className="w-4 h-4 mr-2 text-accent-green" />
                Classes Attended
              </label>
              <Input
                type="number"
                placeholder="e.g., 45"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(e.target.value)}
                className="bg-card/50 border-border backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-foreground">
                <Settings className="w-4 h-4 mr-2 text-accent-orange" />
                Desired %
              </label>
              <Input
                type="number"
                placeholder="80"
                value={desiredPercentage}
                onChange={(e) => setDesiredPercentage(e.target.value)}
                className="bg-card/50 border-border backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Example Scenarios */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Quick Examples
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("60", "54", "80")}
                className="bg-card/30 border-border/50 hover:bg-card/50 text-left flex-col h-auto p-3"
              >
                <div className="font-medium text-success">Good Student</div>
                <div className="text-xs text-muted-foreground">54/60 classes • 90%</div>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("50", "35", "75")}
                className="bg-card/30 border-border/50 hover:bg-card/50 text-left flex-col h-auto p-3"
              >
                <div className="font-medium text-warning">Average Student</div>
                <div className="text-xs text-muted-foreground">35/50 classes • 70%</div>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadExample("45", "20", "85")}
                className="bg-card/30 border-border/50 hover:bg-card/50 text-left flex-col h-auto p-3"
              >
                <div className="font-medium text-danger">Need Help!</div>
                <div className="text-xs text-muted-foreground">20/45 classes • 44%</div>
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              onClick={calculateAttendance}
              disabled={isCalculating || !totalClasses || !attendedClasses}
              className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-button"
            >
              {isCalculating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Calculator className="w-4 h-4" />
                </motion.div>
              ) : (
                <Calculator className="w-4 h-4 mr-2" />
              )}
              {isCalculating ? "Calculating..." : "Calculate"}
            </Button>

            <Button
              onClick={reset}
              variant="outline"
              className="px-6 bg-card/50 border-border backdrop-blur-sm hover:bg-card/70"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
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
            <Card className="p-6 bg-gradient-glass backdrop-blur-sm border border-glass-border shadow-glass">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(result.status)}
                </div>
                <div className="flex-1">
                  <p className="text-lg leading-relaxed text-foreground">
                    {result.message}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-glass backdrop-blur-sm border border-glass-border shadow-glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Status</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(result.currentPercentage)}% Attendance
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-glass backdrop-blur-sm border border-glass-border shadow-glass">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {result.canBunk > 0 ? "Classes You Can Skip" : "Classes to Attend"}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {result.canBunk > 0 ? result.canBunk : result.needToAttend} Classes
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    result.status === 'good' ? 'bg-success/10' : 
                    result.status === 'warning' ? 'bg-warning/10' : 'bg-danger/10'
                  }`}>
                    {result.status === 'good' ? (
                      <BookOpen className="w-6 h-6 text-success" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-warning" />
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