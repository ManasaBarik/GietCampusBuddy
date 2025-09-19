import { motion } from "framer-motion";
import { Cpu, Zap, Settings, Activity, CircuitBoard, Cog, Wrench, Gauge } from "lucide-react";

export function EngineeringBackground() {
  const engineeringIcons = [
    { Icon: Cpu, delay: 0 },
    { Icon: Zap, delay: 2 },
    { Icon: Settings, delay: 4 },
    { Icon: Activity, delay: 6 },
    { Icon: CircuitBoard, delay: 8 },
    { Icon: Cog, delay: 10 },
    { Icon: Wrench, delay: 12 },
    { Icon: Gauge, delay: 14 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Engineering Icons */}
      {engineeringIcons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: -100,
            rotate: 360,
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
      ))}

      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
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

      {/* Pulsing Data Points */}
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-accent-cyan rounded-full"
          style={{
            left: `${10 + (index * 8)}%`,
            top: `${20 + Math.sin(index) * 30}%`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Scanning Lines */}
      <motion.div
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-accent-emerald to-transparent opacity-30"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
      />

      <motion.div
        className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-accent-cyan to-transparent opacity-30"
        initial={{ left: "0%" }}
        animate={{ left: "100%" }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3
        }}
      />

      {/* Binary Rain Effect */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`binary-${index}`}
          className="absolute font-mono text-xs text-primary/20 select-none"
          style={{
            left: `${index * 5}%`,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 20, 
            opacity: [0, 0.5, 0.5, 0] 
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}
    </div>
  );
}