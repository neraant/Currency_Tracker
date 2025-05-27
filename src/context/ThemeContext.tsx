import { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from '@styles/Theme';
import { StorageUtility } from '@utils/localStorage';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeToggle = () => {
  const context = useContext(ThemeToggleContext);
  if (!context) throw new Error('useThemeToggle must be used within ThemeToggleProvider');
  return context;
};

export const ThemeToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(StorageUtility.getItem<boolean>('THEME') ?? true);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const next = !prev;
      StorageUtility.setItem<boolean>('THEME', next);
      return next;
    });
  };

  return (
    <ThemeToggleContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
