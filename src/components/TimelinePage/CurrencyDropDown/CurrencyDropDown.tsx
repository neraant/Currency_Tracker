import { ChangeEvent, createRef, PureComponent } from 'react';
import { CURRENCIES } from '@constants/currencies';
import { CurrencyCode } from '@typings/currency';
import {
  CurrencyDropDownInput,
  CurrencyDropDownItem,
  CurrencyDropDownList,
  CurrencyDropDownWrapper,
} from './styled';

interface ICurrencyDropDownProps {
  selectedCurrency: CurrencyCode;
  setCurrency: (newCurrency: CurrencyCode) => void;
}

interface ICurrencyDropDownState {
  currency: CurrencyCode;
  isDropped: boolean;
  filteredCurrencies: CurrencyCode[];
}

export class CurrencyDropDown extends PureComponent<
  ICurrencyDropDownProps,
  ICurrencyDropDownState
> {
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
    const input = e.target.value as CurrencyCode;
    const filtered = CURRENCIES.filter((cur) => cur.toLowerCase().includes(input.toLowerCase()));

    this.setState({
      currency: input,
      filteredCurrencies: filtered,
    });
  };

  handleSelect = (newCurrency: CurrencyCode) => {
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
