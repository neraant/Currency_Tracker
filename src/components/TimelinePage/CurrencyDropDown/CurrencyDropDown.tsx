import { ChangeEvent, Component, createRef } from 'react';

import { CURRENCIES } from '@constants/Currencies';

import {
  CurrencyDropDownInput,
  CurrencyDropDownItem,
  CurrencyDropDownList,
  CurrencyDropDownWrapper,
} from './styled';

interface ICurrencyDropDownProps {
  selectedCurrency: string;
  setCurrency: (newCurrency: string) => void;
}

interface ICurrencyDropDownState {
  currency: string;
  isDropped: boolean;
  filteredCurrencies: string[];
}

export class CurrencyDropDown extends Component<ICurrencyDropDownProps, ICurrencyDropDownState> {
  state: ICurrencyDropDownState = {
    currency: this.props.selectedCurrency,
    isDropped: false,
    filteredCurrencies: CURRENCIES,
  };

  inputRef = createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: Readonly<ICurrencyDropDownProps>): void {
    if (
      prevProps.selectedCurrency !== this.props.selectedCurrency &&
      this.state.currency !== this.props.selectedCurrency
    ) {
      this.setState({ currency: this.props.selectedCurrency });
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.inputRef.current && !this.inputRef.current.contains(event.target as Node)) {
      const { currency } = this.state;
      const { selectedCurrency } = this.props;

      if (currency.trim() !== selectedCurrency) {
        this.setState({
          currency: selectedCurrency,
          filteredCurrencies: CURRENCIES,
          isDropped: false,
        });
      } else {
        this.setState({ isDropped: false });
      }
    }
  };

  handleDropDown = () => {
    this.setState({ isDropped: !this.state.isDropped });
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filtered = CURRENCIES.filter((cur) => cur.toLowerCase().includes(input.toLowerCase()));

    this.setState({
      currency: input,
      filteredCurrencies: filtered,
    });
  };

  handleSelect = (newCurrency: string) => {
    this.props.setCurrency(newCurrency);
    this.setState({
      isDropped: false,
      currency: newCurrency,
      filteredCurrencies: CURRENCIES,
    });
  };

  render() {
    const { currency, isDropped, filteredCurrencies } = this.state;

    return (
      <CurrencyDropDownWrapper ref={this.inputRef}>
        <CurrencyDropDownInput
          onClick={this.handleDropDown}
          value={currency}
          onChange={this.handleInputChange}
        />

        <CurrencyDropDownList $isDropped={isDropped}>
          {filteredCurrencies.map((currency) => (
            <CurrencyDropDownItem key={currency} onClick={() => this.handleSelect(currency)}>
              {currency}
            </CurrencyDropDownItem>
          ))}
        </CurrencyDropDownList>
      </CurrencyDropDownWrapper>
    );
  }
}
