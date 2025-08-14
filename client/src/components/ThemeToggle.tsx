import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = localStorage.getItem("theme");
    
    if (initialTheme === "dark" || (!initialTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-full transition-all duration-300 hover:scale-110 hover-glow relative overflow-hidden"
    >
      <div 
        className={`absolute inset-0 transition-all duration-500 ${isDark ? 'rotate-0' : 'rotate-180'}`}
        style={{ animation: isDark ? 'themeSwitch 0.6s ease-in-out' : undefined }}
      >
        {isDark ? (
          <Sun className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300" />
        ) : (
          <Moon className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};