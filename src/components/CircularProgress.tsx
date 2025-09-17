import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({ 
  percentage, 
  size = 200, 
  strokeWidth = 8, 
  className = "" 
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (percent: number) => {
    if (percent >= 80) return "hsl(var(--success))";
    if (percent >= 60) return "hsl(var(--accent-orange))";
    return "hsl(var(--danger))";
  };

  const getGradient = (percent: number) => {
    if (percent >= 80) return "var(--gradient-success)";
    if (percent >= 60) return "var(--gradient-warning)";
    return "linear-gradient(135deg, hsl(var(--danger)), hsl(0 85% 70%))";
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-20"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(percentage)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px currentColor)",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <div 
              className="text-4xl font-bold"
              style={{ color: getColor(percentage) }}
            >
              {Math.round(percentage)}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Attendance
            </div>
          </motion.div>
        </div>

        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-30 blur-xl"
          style={{
            background: getGradient(percentage),
            width: size * 0.8,
            height: size * 0.8,
            left: size * 0.1,
            top: size * 0.1,
          }}
        />
      </div>
    </div>
  );
}