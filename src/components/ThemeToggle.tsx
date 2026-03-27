import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: (event: React.MouseEvent) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgba(128,128,128,0.15)] transition-colors"
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
  >
    {theme === 'dark' ? (
      <Sun size={18} className="text-fg-muted" />
    ) : (
      <Moon size={18} className="text-fg-muted" />
    )}
  </button>
);
