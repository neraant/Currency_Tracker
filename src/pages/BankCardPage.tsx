import { Component, ReactNode } from 'react';
import { ElasticSearch } from '@components/BankCardPage/ElasticSearch/ElasticSearch';
import { Map } from '@components/BankCardPage/Map/Map';
import { Container } from '@styles/GlobalStyle';

interface BankCardPageState {
  debouncedQuery: string;
  selectedCurrency: string;
}

export class BankCardPage extends Component<{}, BankCardPageState> {
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

  handleSetCurrency = (newCurrency: string) => {
    this.setState({
      selectedCurrency: newCurrency,
      debouncedQuery: newCurrency,
    });
  };

  render(): ReactNode {
    const { debouncedQuery, selectedCurrency } = this.state;

    return (
      <>
        <Container>
          <ElasticSearch setCurrency={this.handleSetCurrency} selectedCurrency={selectedCurrency} />
        </Container>
        <Map filterCurrency={debouncedQuery} />
      </>
    );
  }
}
