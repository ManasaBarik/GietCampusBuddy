import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, RotateCcw, BookOpen, GraduationCap, Settings, CheckCircle, AlertTriangle, XCircle, Cpu, Zap, Target, TrendingUp, Activity } from "lucide-react";
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
      case "good": return <CheckCircle className="w-6 h-6 text-white" />;
      case "warning": return <AlertTriangle className="w-6 h-6 text-white" />;
      case "danger": return <XCircle className="w-6 h-6 text-white" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          className="relative inline-flex items-center justify-center w-24 h-24 mx-auto"
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-neural opacity-20 blur-xl animate-pulse-glow" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-tech shadow-neural backdrop-blur-sm border border-glass-border flex items-center justify-center">
            <Cpu className="w-10 h-10 text-primary-foreground" />
          </div>
        </motion.div>
        
        <div className="space-y-3">
          <h1 className="text-5xl font-black bg-gradient-neural bg-clip-text text-transparent mb-2">
            Attendance Calculator
          </h1>
          <div className="flex items-center justify-center gap-2 text-xl text-muted-foreground">
            <span>Calculate your attendance like a pro engineer! 🔧</span>
          </div>
        </div>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-glass-border shadow-neural">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-tech mr-3 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                Total Classes
              </label>
              <Input
                type="number"
                placeholder="e.g., 60"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value)}
                className="bg-glass border-glass-border backdrop-blur-sm shadow-card transition-all duration-300 focus:shadow-glow focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-success mr-3 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                Classes Attended
              </label>
              <Input
                type="number"
                placeholder="e.g., 45"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(e.target.value)}
                className="bg-glass border-glass-border backdrop-blur-sm shadow-card transition-all duration-300 focus:shadow-glow focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-gradient-warning mr-3 flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                Desired %
              </label>
              <Input
                type="number"
                placeholder="80"
                value={desiredPercentage}
                onChange={(e) => setDesiredPercentage(e.target.value)}
                className="bg-glass border-glass-border backdrop-blur-sm shadow-card transition-all duration-300 focus:shadow-glow focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              onClick={calculateAttendance}
              disabled={isCalculating || !totalClasses || !attendedClasses}
              className="flex-1 bg-gradient-primary hover:bg-gradient-tech text-primary-foreground shadow-button hover:shadow-glow transition-all duration-300 transform hover:scale-[1.02]"
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
              className="px-8 bg-glass border-glass-border backdrop-blur-sm hover:bg-glass/80 hover:border-primary/30 transition-all duration-300"
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
        <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-glass-border shadow-neural">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary mr-3 flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-tech flex items-center justify-center flex-shrink-0 shadow-glow">
                <span className="text-lg font-black text-white">1</span>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-foreground text-lg">Enter Your Data</p>
                <p className="text-muted-foreground">Total classes conducted and classes you've attended</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center flex-shrink-0 shadow-glow">
                <span className="text-lg font-black text-white">2</span>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-foreground text-lg">Set Target %</p>
                <p className="text-muted-foreground">Your desired attendance percentage (usually 75-80%)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-warning flex items-center justify-center flex-shrink-0 shadow-glow">
                <span className="text-lg font-black text-white">3</span>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-foreground text-lg">Get Results</p>
                <p className="text-muted-foreground">See if you can bunk or need to attend more classes</p>
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
            <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-glass-border shadow-neural">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-glow ${
                    result.status === 'good' ? 'bg-gradient-success' : 
                    result.status === 'warning' ? 'bg-gradient-warning' : 'bg-gradient-danger'
                  }`}>
                    {getStatusIcon(result.status)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xl leading-relaxed text-foreground font-medium">
                    {result.message}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-glass-border shadow-neural group hover:shadow-glow transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-accent-cyan" />
                      Current Status
                    </p>
                    <p className="text-3xl font-black text-foreground">
                      {Math.round(result.currentPercentage)}% Attendance
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-tech flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-glass backdrop-blur-xl border border-glass-border shadow-neural group hover:shadow-glow transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Target className="w-4 h-4 mr-2 text-accent-emerald" />
                      {result.canBunk > 0 ? "Classes You Can Skip" : "Classes to Attend"}
                    </p>
                    <p className="text-3xl font-black text-foreground">
                      {result.canBunk > 0 ? result.canBunk : result.needToAttend} Classes
                    </p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300 ${
                    result.status === 'good' ? 'bg-gradient-success' : 
                    result.status === 'warning' ? 'bg-gradient-warning' : 'bg-gradient-danger'
                  }`}>
                    {result.status === 'good' ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-white" />
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