import { Moon, Sun } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export function ThemeToggle({ variant = 'outline', size = 'icon', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={showLabel ? 'gap-2' : ''}
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-4 w-4" />
          {showLabel && <span>Dark Mode</span>}
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          {showLabel && <span>Light Mode</span>}
        </>
      )}
    </Button>
  );
}
