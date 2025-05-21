import { ChangeEvent, Component, KeyboardEvent, ReactNode } from 'react';

import { CurrencyDropDownInput } from './styled';

interface ChartSearchProps {
  handleDropDown: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  query: string;
}

export class ChartSearch extends Component<ChartSearchProps, {}> {
  render(): ReactNode {
    const { handleDropDown, handleInputChange, handleKeyDown, query } = this.props;
    return (
      <CurrencyDropDownInput
        onClick={handleDropDown}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Введите валюту..."
      />
    );
  }
}
