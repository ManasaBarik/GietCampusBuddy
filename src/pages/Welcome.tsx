import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { EngineeringBackground } from "@/components/EngineeringBackground";
import { Calculator, TrendingUp, BookOpen, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden circuit-board">
      {/* Engineering Background Animations - Mobile optimized */}
      <EngineeringBackground />
      
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-violet/8 to-accent-emerald/5" />
      <div className="absolute inset-0 bg-gradient-cyber opacity-[0.02]" />
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-hologram opacity-20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-neural opacity-15 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-cyber opacity-5 rounded-full blur-3xl animate-spin-slow" />
      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-accent-neon/30 to-transparent animate-matrix-rain"
            style={{
              left: `${5 + i * 6}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Theme toggle - Mobile optimized */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Main content - Mobile optimized */}
      <div className="relative z-10 container mx-auto py-8 px-4 md:py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full space-y-8 md:space-y-12"
        >
          {/* Hero Section - Mobile optimized */}
          <div className="text-center space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto w-20 h-20 md:w-28 md:h-28 bg-gradient-cyber rounded-full flex items-center justify-center shadow-neural relative overflow-hidden tech-border"
            >
              <div className="absolute inset-0 bg-gradient-circuit opacity-50 animate-circuit-flow" />
              <BookOpen className="w-10 h-10 md:w-14 md:h-14 text-white relative z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3 md:space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold holographic-text leading-tight relative">
                <span className="neon-glow">Student's Campus Buddy</span>
                <div className="absolute -inset-1 bg-gradient-cyber blur opacity-20 animate-pulse" />
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Your all-in-one companion for academic excellence. Calculate attendance, predict CGPA, and stay on track for graduation! 🚀
              </p>
            </motion.div>
          </div>

          {/* Calculator Cards - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8 md:mt-16"
          >
            {/* Attendance Calculator Card */}
            <Card className="group glass-morphism tech-border shadow-neural hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-circuit animate-circuit-flow" />
              <CardHeader className="text-center space-y-4 pb-6 relative z-10">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent-violet rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-circuit opacity-30 animate-circuit-flow" />
                  <Calculator className="w-8 h-8 text-white relative z-10" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground relative">
                  <span className="holographic-text">Attendance Calculator</span>
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Never worry about attendance again! Calculate how many classes you can skip or need to attend to maintain your required percentage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 group/item hover:text-accent-cyan transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Track attendance percentage in real-time</span>
                  </div>
                  <div className="flex items-center gap-2 group/item hover:text-accent-violet transition-colors">
                    <div className="w-2 h-2 bg-accent-violet rounded-full animate-pulse delay-100"></div>
                    <span>Calculate classes you can safely skip</span>
                  </div>
                  <div className="flex items-center gap-2 group/item hover:text-accent-emerald transition-colors">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse delay-200"></div>
                    <span>Find out how many classes needed for target %</span>
                  </div>
                </div>
                <Link to="/attendance" className="block">
                  <Button className="w-full cyber-button bg-gradient-to-r from-primary to-accent-violet hover:shadow-neural transition-all duration-300 text-base md:text-lg py-4 md:py-6 min-h-[48px] touch-manipulation relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Open Attendance Calculator
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-hologram opacity-0 group-hover:opacity-20 transition-opacity" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CGPA Calculator Card */}
            <Card className="group glass-morphism tech-border shadow-neural hover:shadow-glow transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-neural opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-circuit animate-circuit-flow delay-500" />
              <CardHeader className="text-center space-y-4 pb-6 relative z-10">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent-emerald to-accent-violet rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-circuit opacity-30 animate-circuit-flow delay-300" />
                  <TrendingUp className="w-8 h-8 text-white relative z-10" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground relative">
                  <span className="holographic-text">CGPA Calculator</span>
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Plan your academic journey! Calculate current CGPA and predict what SGPA you need to achieve your graduation goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 group/item hover:text-accent-emerald transition-colors">
                    <div className="w-2 h-2 bg-accent-emerald rounded-full animate-pulse"></div>
                    <span>Calculate CGPA from completed semesters</span>
                  </div>
                  <div className="flex items-center gap-2 group/item hover:text-accent-violet transition-colors">
                    <div className="w-2 h-2 bg-accent-violet rounded-full animate-pulse delay-100"></div>
                    <span>Predict required SGPA for graduation goal</span>
                  </div>
                  <div className="flex items-center gap-2 group/item hover:text-primary transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                    <span>Works for any semester (1st to 7th)</span>
                  </div>
                </div>
                <Link to="/cgpa" className="block">
                  <Button className="w-full cyber-button bg-gradient-to-r from-accent-emerald to-accent-violet hover:shadow-neural transition-all duration-300 text-base md:text-lg py-4 md:py-6 min-h-[48px] touch-manipulation relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Open CGPA Calculator
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-hologram opacity-0 group-hover:opacity-20 transition-opacity" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature Highlight - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-hologram rounded-lg p-8 tech-border text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-cyber opacity-5" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-circuit opacity-10 animate-circuit-flow" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="w-6 h-6 text-accent-neon animate-pulse" />
                <h3 className="text-xl font-semibold holographic-text">Why Choose Student Success Hub?</h3>
              </div>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                Designed specifically for <span className="text-accent-cyan font-semibold">engineering students</span> who love to optimize everything! Our tools help you make <span className="text-accent-emerald font-semibold">data-driven decisions</span> about your academic journey, ensuring you stay on track for success while maintaining the perfect balance between studies and life. ✨
              </p>
            </div>
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