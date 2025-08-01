import { ChangeEvent, Component } from 'react';
import { ChartInput, ChartInputError, ChartInputWrapper, ChartLabel } from './styled';

interface IChartInputProps {
  label: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
  disabled?: boolean;
}

export default class ChartInputComponent extends Component<IChartInputProps, {}> {
  render() {
    const { label, value, isValid = true, onChange, disabled = false } = this.props;

    return (
      <ChartInputWrapper>
        <ChartLabel htmlFor={label}>{label}</ChartLabel>
        <ChartInput
          data-testid={`chart-input-${label}`}
          id={label}
          value={value}
          onChange={onChange}
          disabled={disabled || false}
        />
        {!isValid && <ChartInputError>Invalid value</ChartInputError>}
      </ChartInputWrapper>
    );
  }
}
