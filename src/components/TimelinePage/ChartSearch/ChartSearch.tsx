import { ChangeEvent, KeyboardEvent, PureComponent } from 'react';
import { CurrencyCode } from '@typings/currency';
import { CurrencyDropDownInput } from './styled';

interface ChartSearchProps {
  handleDropDown: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  query: string;
  selectedCurrency: CurrencyCode | '';
}

export class ChartSearch extends PureComponent<ChartSearchProps> {
  render() {
    const { handleDropDown, handleInputChange, handleKeyDown, query, selectedCurrency } =
      this.props;

    return (
      <CurrencyDropDownInput
        data-testid="currency-dropdown-input"
        onClick={handleDropDown}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={selectedCurrency || 'Search currency...'}
      />
    );
  }
}
