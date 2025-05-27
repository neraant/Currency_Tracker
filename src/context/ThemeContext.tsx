import { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { STORAGE_KEYS } from '@constants/localStorage';
import { DarkTheme, LightTheme } from '@styles/Theme';
import { AppTheme } from '@typings/theme';
import { StorageUtility } from '@utils/localStorage';

interface ThemeContextType {
  theme: AppTheme;
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeToggle = () => {
  const context = useContext(ThemeToggleContext);
  if (!context) throw new Error('useThemeToggle must be used within ThemeToggleProvider');
  return context;
};

export const ThemeToggleProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(
    StorageUtility.getItem<AppTheme>(STORAGE_KEYS.THEME) ?? 'dark'
  );

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    StorageUtility.setItem<AppTheme>(STORAGE_KEYS.THEME, next);
  };

  return (
    <ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
