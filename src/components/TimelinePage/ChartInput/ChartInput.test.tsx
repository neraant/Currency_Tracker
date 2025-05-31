import { fireEvent, render, screen } from '@testing-library/react';
import ChartInputComponent from './ChartInputComponent';

describe('ChartInputComponent', () => {
  describe('Rendering', () => {
    test('renders the label and input with given value', () => {
      render(<ChartInputComponent label="test label" value="123" />);
      expect(screen.getByText('test label')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    });

    test('shows error message when isValid is false', () => {
      render(<ChartInputComponent label="test label" value="input" isValid={false} />);
      expect(screen.getByText('Invalid value')).toBeInTheDocument();
    });

    test('disables the input when disabled prop is true', () => {
      render(<ChartInputComponent label="test label" value="input" disabled />);
      const input = screen.getByDisplayValue('input');
      expect(input).toBeDisabled();
    });
  });

  describe('Behavior', () => {
    test('calls onChange when input changes', () => {
      const handleChange = jest.fn();
      render(<ChartInputComponent label="test label" value="input" onChange={handleChange} />);
      const input = screen.getByDisplayValue('input');
      fireEvent.change(input, { target: { value: 'another' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
