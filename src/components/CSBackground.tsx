import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Database, GitBranch, Server, Binary, Command } from "lucide-react";

export const CSBackground = () => {
  // Matrix rain characters - reduced for performance
  const matrixChars = "01";
  const matrixColumns = 12;
  
  // Code snippets for background
  const codeSnippets = [
    "function calculateCGPA() {",
    "const result = sgpa.reduce(",
    "if (attendance >= 75%)",
    "return Math.round(cgpa);",
    "await fetchData();",
    "console.log('Success');",
    "const avg = total / count;",
    "} catch (error) {",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Matrix rain effect - optimized for performance */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: matrixColumns }).map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="absolute text-primary/10 font-mono text-xs pointer-events-none will-change-transform"
            style={{
              left: `${(i / matrixColumns) * 100}%`,
              top: 0,
            }}
            animate={{
              y: ["0vh", "100vh"],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j} className="opacity-30">
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Floating CS icons - optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {[Terminal, Code, Cpu, Database].map((Icon, index) => (
          <motion.div
            key={`icon-${index}`}
            className="absolute text-primary/6"
            style={{
              left: `${15 + (index * 22)}%`,
              top: `${25 + ((index * 20) % 50)}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.04, 0.08, 0.04],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={44 + (index % 2) * 8} />
          </motion.div>
        ))}
      </div>

      {/* Code snippets - reduced and optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.slice(0, 4).map((snippet, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute font-mono text-xs text-primary/6 whitespace-nowrap"
            style={{
              left: `${10 + (index * 25) % 80}%`,
              top: `${15 + (index * 30) % 65}%`,
            }}
            animate={{
              opacity: [0.04, 0.08, 0.04],
            }}
            transition={{
              duration: 12 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Terminal grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Scanning line - single optimized */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent will-change-transform"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glowing orbs - subtle ambient light */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/4 blur-3xl"
        style={{ top: "15%", left: "10%" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent-cyber/3 blur-3xl"
        style={{ bottom: "15%", right: "10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Binary dots - reduced for performance */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>
    </div>
  );
};
