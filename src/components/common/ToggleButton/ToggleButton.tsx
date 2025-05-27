import { useThemeToggle } from '@context/ThemeContext';
import { Circle, ToggleWrapper } from './styled';

export const ToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useThemeToggle();

  return (
    <ToggleWrapper $toggled={isDarkTheme} onClick={toggleTheme}>
      <Circle $toggled={isDarkTheme} />
    </ToggleWrapper>
  );
};
