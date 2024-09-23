'use client';

import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-5 w-5 ${isDarkMode ? 'text-primary/50' : 'text-primary'}`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
      <Moon
        className={`h-5 w-5 ${isDarkMode ? 'text-primary' : 'text-primary/50'}`}
      />
    </div>
  );
};

export default ThemeButton;
