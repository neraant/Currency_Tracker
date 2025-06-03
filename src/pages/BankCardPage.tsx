import { PureComponent, ReactNode } from 'react';
import { ElasticSearch } from '@components/BankCardPage/ElasticSearch/ElasticSearch';
import { Map } from '@components/BankCardPage/Map/Map';
import { Container } from '@styles/GlobalStyle';
import { CurrencyCode } from '@typings/currency';

interface BankCardPageState {
  debouncedQuery: string;
  selectedCurrency: CurrencyCode | '';
}

export class BankCardPage extends PureComponent<{}, BankCardPageState> {
  timeoutId: ReturnType<typeof setTimeout> | null = null;

  state: BankCardPageState = {
    debouncedQuery: '',
    selectedCurrency: '',
  };

  componentWillUnmount(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleSetCurrency = (newCurrency: CurrencyCode | '') => {
    this.setState({
      selectedCurrency: newCurrency,
      debouncedQuery: newCurrency,
    });
  };

  render(): ReactNode {
    const { debouncedQuery, selectedCurrency } = this.state;

    return (
      <>
        <Container data-testid="map-container">
          <ElasticSearch setCurrency={this.handleSetCurrency} selectedCurrency={selectedCurrency} />
        </Container>
        <Map filterCurrency={debouncedQuery} />
      </>
    );
  }
}
