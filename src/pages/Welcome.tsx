import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EngineeringBackground } from "@/components/EngineeringBackground";
import { Calculator, TrendingUp, BookOpen, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Engineering Background Animations */}
      <EngineeringBackground />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent-violet/3 to-accent-emerald/3" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-neural opacity-10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-tech opacity-15 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-neural opacity-5 rounded-full blur-3xl" />
      
      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto w-24 h-24 bg-gradient-neural rounded-full flex items-center justify-center shadow-tech"
            >
              <BookOpen className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                Student's Campus Buddy
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your all-in-one companion for academic excellence. Calculate attendance, predict CGPA, and stay on track for graduation! 🚀
              </p>
            </motion.div>
          </div>

          {/* Calculator Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16"
          >
            {/* Attendance Calculator Card */}
            <Card className="group glass-morphism border-tech shadow-tech hover:shadow-neural transition-all duration-500 hover:scale-105">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent-violet rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Attendance Calculator
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Never worry about attendance again! Calculate how many classes you can skip or need to attend to maintain your required percentage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Track attendance percentage in real-time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-violet rounded-full"></div>
                    <span>Calculate classes you can safely skip</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full"></div>
                    <span>Find out how many classes needed for target %</span>
                  </div>
                </div>
                <Link to="/attendance" className="block">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent-violet hover:shadow-neural transition-all duration-300 text-lg py-6">
                    Open Attendance Calculator
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CGPA Calculator Card */}
            <Card className="group glass-morphism border-tech shadow-tech hover:shadow-neural transition-all duration-500 hover:scale-105">
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent-emerald to-accent-violet rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  CGPA Calculator
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Plan your academic journey! Calculate current CGPA and predict what SGPA you need to achieve your graduation goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full"></div>
                    <span>Calculate CGPA from completed semesters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-violet rounded-full"></div>
                    <span>Predict required SGPA for graduation goal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Works for any semester (1st to 7th)</span>
                  </div>
                </div>
                <Link to="/cgpa" className="block">
                  <Button className="w-full bg-gradient-to-r from-accent-emerald to-accent-violet hover:shadow-neural transition-all duration-300 text-lg py-6">
                    Open CGPA Calculator
                    <ArrowRight className="ml-2 w-5 h-5" />
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
            className="bg-gradient-to-br from-primary/5 via-accent-violet/5 to-accent-emerald/5 rounded-lg p-8 border border-tech/20 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Why Choose Student Success Hub?</h3>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Designed specifically for engineering students who love to optimize everything! Our tools help you make data-driven decisions about your academic journey, ensuring you stay on track for success while maintaining the perfect balance between studies and life. ✨
            </p>
          </motion.div>
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

export default Welcome;