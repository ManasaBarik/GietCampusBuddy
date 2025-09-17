import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-gradient-glass backdrop-blur-sm border border-glass-border shadow-glass hover:shadow-button transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-accent-purple" />
        ) : (
          <Sun className="w-5 h-5 text-accent-orange" />
        )}
      </motion.div>
    </motion.button>
  );
}