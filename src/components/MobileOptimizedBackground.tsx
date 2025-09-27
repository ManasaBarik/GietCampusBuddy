import { motion } from "framer-motion";
import { Cpu, Zap, Calculator, TrendingUp } from "lucide-react";

export function MobileOptimizedBackground() {
  const engineeringIcons = [
    { Icon: Cpu, delay: 0 },
    { Icon: Zap, delay: 2 },
    { Icon: Calculator, delay: 4 },
    { Icon: TrendingUp, delay: 6 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Reduced icons for mobile performance */}
      {engineeringIcons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10 md:opacity-5"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            rotate: 0,
            scale: 0.3
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -100,
            rotate: 360,
            scale: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
          }}
          style={{
            left: `${20 + (index * 25)}%`,
          }}
        >
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
        </motion.div>
      ))}

      {/* Simplified circuit pattern for mobile */}
      <div className="absolute inset-0 opacity-5 hidden md:block">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <motion.path
                d="M20,20 L80,20 L80,80 L20,80 L20,40 L60,40 L60,60 L40,60"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <circle cx="20" cy="20" r="2" fill="hsl(var(--accent-cyan))" />
              <circle cx="80" cy="80" r="2" fill="hsl(var(--accent-emerald))" />
              <circle cx="60" cy="40" r="2" fill="hsl(var(--accent-amber))" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Reduced data points for mobile */}
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-accent-cyan rounded-full"
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${30 + Math.sin(index) * 20}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Single scanning line for mobile performance */}
      <motion.div
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-accent-emerald to-transparent opacity-20 md:opacity-30"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 4
        }}
      />
    </div>
  );
}