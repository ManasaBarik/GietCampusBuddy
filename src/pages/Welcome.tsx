import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CSBackground } from "@/components/CSBackground";
import { Calculator, TrendingUp, Terminal, Code, ArrowRight, Braces } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* CS Background Animations */}
      <CSBackground />
      
      {/* Terminal-style background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent-cyber/5 to-accent-code/5" />
      
      {/* Terminal window mockup in background */}
      <div className="absolute top-20 left-10 w-64 h-40 border border-primary/20 rounded-lg bg-card/5 backdrop-blur-sm p-2 font-mono text-xs text-primary/30 hidden lg:block">
        <div className="flex gap-1 mb-2">
          <div className="w-2 h-2 rounded-full bg-danger/50" />
          <div className="w-2 h-2 rounded-full bg-warning/50" />
          <div className="w-2 h-2 rounded-full bg-success/50" />
        </div>
        <div>$ student_portal.calculate()</div>
        <div className="flex items-center gap-1 mt-1">
          <span>→</span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>_</motion.span>
        </div>
      </div>
      
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
              className="mx-auto w-24 h-24 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-cyber border border-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <Terminal className="w-12 h-12 text-white relative z-10" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-cyber bg-clip-text text-transparent font-mono tracking-tight">
                <Code className="inline-block w-12 h-12 md:w-16 md:h-16 mb-2 text-primary" />{" "}
                Student.Campus()<span className="text-primary animate-terminal-blink">_</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                <span className="font-mono text-primary">{"{ "}</span>
                Your CS-powered companion for academic excellence
                <span className="font-mono text-primary">{" }"}</span>
                <br />
                <span className="text-base opacity-75">// Calculate attendance, predict CGPA, optimize your grades</span>
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
            <Card className="group bg-card/50 backdrop-blur-sm border-glass-border shadow-terminal hover:shadow-matrix transition-all duration-500 hover:scale-[1.02] hover:border-primary/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-terminal border-b border-glass-border flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-danger/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-warning/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">attendance.calc</span>
              </div>
              <CardHeader className="text-center space-y-4 pb-6 pt-12">
                <div className="mx-auto w-16 h-16 bg-gradient-matrix rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-matrix border border-primary/30">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground font-mono">
                  Attendance<span className="text-primary">.calc()</span>
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  <span className="font-mono text-xs text-primary/70">// Never worry about attendance again</span>
                  <br />
                  Calculate skippable classes or required attendance using our algorithm.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 text-sm text-muted-foreground font-mono bg-glass/30 p-4 rounded border border-glass-border">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Track percentage in real-time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-code">✓</span>
                    <span>Calculate safe skip count</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-cyber">✓</span>
                    <span>Find classes needed for target</span>
                  </div>
                </div>
                <Link to="/attendance" className="block">
                  <Button variant="terminal" className="w-full text-base py-6 font-mono group-hover:animate-pulse-glow">
                    <Terminal className="mr-2 w-5 h-5" />
                    Execute Calculator
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CGPA Calculator Card */}
            <Card className="group bg-card/50 backdrop-blur-sm border-glass-border shadow-terminal hover:shadow-code transition-all duration-500 hover:scale-[1.02] hover:border-accent-code/50 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-code border-b border-glass-border flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-danger/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-warning/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">cgpa.compute</span>
              </div>
              <CardHeader className="text-center space-y-4 pb-6 pt-12">
                <div className="mx-auto w-16 h-16 bg-gradient-code rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-code border border-accent-code/30">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground font-mono">
                  CGPA<span className="text-accent-code">.compute()</span>
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  <span className="font-mono text-xs text-accent-code/70">// Plan your academic trajectory</span>
                  <br />
                  Calculate current CGPA and predict required SGPA for your goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3 text-sm text-muted-foreground font-mono bg-glass/30 p-4 rounded border border-glass-border">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Compute from all semesters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent-cyber">✓</span>
                    <span>Predict required SGPA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Supports semesters 1-7</span>
                  </div>
                </div>
                <Link to="/cgpa" className="block">
                  <Button variant="code" className="w-full text-base py-6 font-mono group-hover:animate-pulse-glow">
                    <Braces className="mr-2 w-5 h-5" />
                    Execute Calculator
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
            className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-glass-border shadow-terminal text-center overflow-hidden relative"
          >
            <div className="absolute top-2 right-2 font-mono text-xs text-primary/50">{"// why-us"}</div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold font-mono">
                Why <span className="text-primary">Choose</span> This Portal<span className="text-primary animate-terminal-blink">?</span>
              </h3>
            </div>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto font-light">
              <span className="font-mono text-primary text-sm">const mission = </span>
              "Designed for CS & engineering students who think in algorithms. 
              Our tools help you optimize your academic performance through data-driven insights, 
              ensuring you compile success while debugging life's challenges."
              <span className="font-mono text-primary text-sm">;</span>
            </p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-mono text-primary">Data-Driven</span>
              <span className="px-3 py-1 bg-accent-code/10 border border-accent-code/30 rounded text-xs font-mono text-accent-code">Optimized</span>
              <span className="px-3 py-1 bg-accent-cyber/10 border border-accent-cyber/30 rounded text-xs font-mono text-accent-cyber">Student-First</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 text-center py-8 text-muted-foreground border-t border-glass-border/30"
      >
        <p className="text-sm mb-2 font-mono">
          <span className="text-primary">{"// "}</span>
          Built by students, for students who optimize everything
          <span className="text-primary">{" //"}</span>
        </p>
        <div className="text-xs space-y-1 font-mono">
          <p><span className="text-primary">$ </span>Credits: @barik.unleashed & @SRM</p>
          <p><span className="text-primary">$ </span>© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Welcome;