import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Database, GitBranch, Server, Binary, Command } from "lucide-react";

export const CSBackground = () => {
  // Matrix rain characters
  const matrixChars = "01";
  const matrixColumns = 40;
  
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
      {/* Matrix rain effect */}
      <div className="absolute inset-0">
        {Array.from({ length: matrixColumns }).map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="absolute text-primary/20 font-mono text-xs"
            style={{
              left: `${(i / matrixColumns) * 100}%`,
              top: 0,
            }}
            animate={{
              y: ["0vh", "100vh"],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="opacity-50">
                {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Floating CS icons */}
      <div className="absolute inset-0">
        {[Terminal, Code, Cpu, Database, GitBranch, Server, Binary, Command].map((Icon, index) => (
          <motion.div
            key={`icon-${index}`}
            className="absolute text-primary/10"
            style={{
              left: `${10 + (index * 12)}%`,
              top: `${20 + ((index * 17) % 60)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={48 + (index % 3) * 16} />
          </motion.div>
        ))}
      </div>

      {/* Code snippets floating */}
      <div className="absolute inset-0">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute font-mono text-xs text-primary/10 whitespace-nowrap"
            style={{
              left: `${5 + (index * 15) % 85}%`,
              top: `${10 + (index * 25) % 70}%`,
            }}
            animate={{
              x: [-20, 20, -20],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 8 + index,
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

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        style={{ top: "10%", left: "10%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-accent-cyber/5 blur-3xl"
        style={{ bottom: "10%", right: "10%" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Binary dots pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};
