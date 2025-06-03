import { useThemeToggle } from '@context/ThemeContext';
import { Circle, ToggleWrapper } from './styled';

export const ToggleButton = () => {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <ToggleWrapper
      data-testid="theme-wrapper"
      data-theme={theme}
      $toggled={theme === 'dark'}
      onClick={toggleTheme}
    >
      <Circle $toggled={theme === 'dark'} />
    </ToggleWrapper>
  );
};
