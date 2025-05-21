import { Component } from 'react';

import { Container } from '@styles/GlobalStyle';

import { CurrencyDropDown } from '@components/common/CurrencyDropDown/CurrencyDropDown';
import { ChartComponent } from '@components/TimelinePage/ChartComponent/ChartComponent';
import { ChartSearch } from '@components/TimelinePage/ChartSearch/ChartSearch';

import { CurrencyCode } from '@typings/currency';

interface ITimelinePageState {
  selectedCurrency: CurrencyCode;
  isModal: boolean;
}

export class TimelinePage extends Component<{}, ITimelinePageState> {
  state: ITimelinePageState = {
    selectedCurrency: CurrencyCode.USD,
    isModal: false,
  };

  setCurrency = (newCurrency: CurrencyCode) => {
    this.setState({ selectedCurrency: newCurrency });
  };

  handleCloseModal = () => {
    this.setState({ isModal: false });
  };

  handleOpenModal = () => {
    this.setState({ isModal: true });
  };

  render() {
    const { selectedCurrency, isModal } = this.state;

    return (
      <Container>
        <CurrencyDropDown setCurrency={this.setCurrency} selectedCurrency={selectedCurrency}>
          {({ query, handleDropDown, handleInputChange, handleKeyDown }) => (
            <ChartSearch
              query={query}
              handleDropDown={handleDropDown}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
            />
          )}
        </CurrencyDropDown>

        <ChartComponent
          selectedCurrency={selectedCurrency}
          isModal={isModal}
          handleCloseModal={this.handleCloseModal}
          handleOpenModal={this.handleOpenModal}
        />
      </Container>
    );
  }
}
