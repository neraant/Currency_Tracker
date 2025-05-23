import { Component, ReactNode } from 'react';

import search_icon from '@assets/icons/search_icon.svg';
import { CurrencyDropDown } from '@components/common/CurrencyDropDown/CurrencyDropDown';

import {
  SearchButton,
  SearchContainer,
  SearchInput,
  SearchInputContainer,
  SearchTitle,
} from './styled';

interface ElasticSearchProps {
  selectedCurrency?: string;
  setCurrency: (newCurrency: string) => void;
}

export class ElasticSearch extends Component<ElasticSearchProps, {}> {
  render(): ReactNode {
    const { selectedCurrency, setCurrency } = this.props;

    return (
      <SearchContainer>
        <SearchTitle>Search currency in the bank</SearchTitle>
        <SearchInputContainer>
          <CurrencyDropDown selectedCurrency={selectedCurrency} setCurrency={setCurrency}>
            {({ query, handleDropDown, handleInputChange, handleKeyDown }) => (
              <SearchInput
                value={query}
                onClick={handleDropDown}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Сurrency search..."
              />
            )}
          </CurrencyDropDown>
          <SearchButton>
            <img src={search_icon} alt="search" />
          </SearchButton>
        </SearchInputContainer>
      </SearchContainer>
    );
  }
}
