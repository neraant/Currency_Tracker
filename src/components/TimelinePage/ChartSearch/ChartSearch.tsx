import { ChangeEvent, KeyboardEvent, PureComponent, ReactNode } from 'react';
import { CurrencyCode } from '@typings/currency';
import { CurrencyDropDownInput } from './styled';

interface ChartSearchProps {
  handleDropDown: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  query: string;
  selectedCurrency: CurrencyCode | '';
}

export class ChartSearch extends PureComponent<ChartSearchProps, {}> {
  render(): ReactNode {
    const { handleDropDown, handleInputChange, handleKeyDown, query, selectedCurrency } =
      this.props;
    return (
      <CurrencyDropDownInput
        onClick={handleDropDown}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={selectedCurrency || 'Search currency...'}
      />
    );
  }
}
