import { useThemeToggle } from '@context/ThemeContext';
import { Circle, ToggleWrapper } from './styled';

export const ToggleButton = () => {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <ToggleWrapper $toggled={theme === 'dark'} onClick={toggleTheme}>
      <Circle $toggled={theme === 'dark'} />
    </ToggleWrapper>
  );
};
