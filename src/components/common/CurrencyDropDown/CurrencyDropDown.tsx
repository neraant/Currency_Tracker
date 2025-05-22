import { ChangeEvent, Component, createRef, KeyboardEvent, ReactNode } from 'react';

import { CurrencyCode } from '@typings/currency';

import { CURRENCIES } from '@constants/currencies';

import { CurrencyDropDownItem, CurrencyDropDownList, CurrencyDropDownWrapper } from './styled';

interface ICurrencyDropDownProps {
  selectedCurrency?: string;
  setCurrency: (newCurrency: CurrencyCode) => void;
  children: (props: {
    query: string;
    handleDropDown: () => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  }) => ReactNode;
}

interface ICurrencyDropDownState {
  query: string | '';
  isDropped: boolean;
  filteredCurrencies: CurrencyCode[];
  activeIndex: number;
}

export class CurrencyDropDown extends Component<ICurrencyDropDownProps, ICurrencyDropDownState> {
  state: ICurrencyDropDownState = {
    query: this.props.selectedCurrency || '',
    isDropped: false,
    filteredCurrencies: CURRENCIES,
    activeIndex: -1,
  };

  inputRef = createRef<HTMLDivElement>();
  debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  componentDidUpdate(prevProps: Readonly<ICurrencyDropDownProps>): void {
    if (
      prevProps.selectedCurrency !== this.props.selectedCurrency &&
      this.state.query !== this.props.selectedCurrency
    ) {
      this.setState({ query: this.props.selectedCurrency || '' });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.inputRef.current && !this.inputRef.current.contains(event.target as Node)) {
      const { query } = this.state;
      const { selectedCurrency } = this.props;

      if (query.trim() !== selectedCurrency) {
        this.setState({
          query: selectedCurrency || '',
          filteredCurrencies: CURRENCIES,
          isDropped: false,
          activeIndex: -1,
        });
      } else {
        this.setState({ isDropped: false, activeIndex: -1 });
      }
    }
  };

  handleDropDown = () => {
    this.setState((prev) => ({ isDropped: !prev.isDropped, activeIndex: -1 }));
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      const filtered = CURRENCIES.filter((cur) => cur.toLowerCase().includes(input.toLowerCase()));

      this.setState({
        filteredCurrencies: filtered,
        isDropped: true,
        activeIndex: -1,
      });
    }, 300);

    this.setState({ query: input });
  };

  handleSelect = (newCurrency: CurrencyCode) => {
    this.props.setCurrency(newCurrency);
    this.setState({
      isDropped: false,
      query: newCurrency,
      filteredCurrencies: CURRENCIES,
      activeIndex: -1,
    });
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { activeIndex, filteredCurrencies, isDropped } = this.state;

    if (!isDropped) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.setState({
        activeIndex: activeIndex < filteredCurrencies.length - 1 ? activeIndex + 1 : 0,
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.setState({
        activeIndex: activeIndex > 0 ? activeIndex - 1 : filteredCurrencies.length - 1,
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredCurrencies.length) {
        this.handleSelect(filteredCurrencies[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      this.setState({ isDropped: false, activeIndex: -1 });
    }
  };

  render() {
    const { query, isDropped, filteredCurrencies, activeIndex } = this.state;
    const { children } = this.props;

    return (
      <CurrencyDropDownWrapper ref={this.inputRef}>
        {children({
          query,
          handleDropDown: this.handleDropDown,
          handleInputChange: this.handleInputChange,
          handleKeyDown: this.handleKeyDown,
        })}

        <CurrencyDropDownList $isDropped={isDropped}>
          {filteredCurrencies.map((currency, index) => (
            <CurrencyDropDownItem
              key={currency}
              onClick={() => this.handleSelect(currency)}
              $isActive={index === activeIndex}
            >
              {currency}
            </CurrencyDropDownItem>
          ))}
        </CurrencyDropDownList>
      </CurrencyDropDownWrapper>
    );
  }
}
