import { ChangeEvent, Component, ReactNode } from 'react';

import { Container } from '@styles/GlobalStyle';

import { ElasticSearch } from '@components/BankCardPage/ElasticSearch/ElasticSearch';
import { Map } from '@components/BankCardPage/Map/Map';

interface BankCardPageState {
  query: string;
  debouncedQuery: string;
  selectedCurrency: string;
}

export class BankCardPage extends Component<{}, BankCardPageState> {
  timeoutId: ReturnType<typeof setTimeout> | null = null;

  state: BankCardPageState = {
    query: '',
    debouncedQuery: '',
    selectedCurrency: '',
  };

  componentWillUnmount(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleDebouncedChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.handleQueryChange(e);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.setState({ debouncedQuery: e.target.value });
    }, 400);
  };

  handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSetCurrency = (newCurrency: string) => {
    this.setState({
      selectedCurrency: newCurrency,
      query: newCurrency,
      debouncedQuery: newCurrency,
    });
  };

  render(): ReactNode {
    const { query, debouncedQuery, selectedCurrency } = this.state;

    return (
      <>
        <Container>
          <ElasticSearch
            query={query}
            onChange={this.handleDebouncedChange}
            setCurrency={this.handleSetCurrency}
            selectedCurrency={selectedCurrency}
          />
        </Container>
        <Map filterCurrency={debouncedQuery} />
      </>
    );
  }
}
