import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleButton } from '@components/common/ToggleButton/ToggleButton';
import { ThemeToggleProvider } from '@context/ThemeContext';

describe('ThemeToggle', () => {
  test('renders with default dark theme', () => {
    render(
      <ThemeToggleProvider>
        <ToggleButton />
      </ThemeToggleProvider>
    );

    const wrapper = screen.getByTestId('theme-wrapper');
    expect(wrapper).toHaveAttribute('data-theme', 'dark');
  });

  test('toggles theme on click', async () => {
    render(
      <ThemeToggleProvider>
        <ToggleButton />
      </ThemeToggleProvider>
    );

    const wrapper = screen.getByTestId('theme-wrapper');
    expect(wrapper).toHaveAttribute('data-theme', 'dark');

    await userEvent.click(wrapper);
    expect(wrapper).toHaveAttribute('data-theme', 'light');
  });
});
