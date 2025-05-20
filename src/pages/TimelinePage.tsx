import { Component } from 'react';

import { Container } from '@styles/GlobalStyle';

import { Overlay } from '@components/common/Overlay/Overlay';
import { ChartComponent } from '@components/TimelinePage/ChartComponent/ChartComponent';
import { CurrencyDropDown } from '@components/TimelinePage/CurrencyDropDown/CurrencyDropDown';

interface ITimelinePageState {
  selectedCurrency: string;
  isModal: boolean;
}

export class TimelinePage extends Component<{}, ITimelinePageState> {
  state: ITimelinePageState = {
    selectedCurrency: 'USD',
    isModal: false,
  };

  setCurrency = (newCurrency: string) => {
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
        <CurrencyDropDown
          setCurrency={(currency) => this.setCurrency(currency)}
          selectedCurrency={selectedCurrency}
        />

        <ChartComponent
          selectedCurrency={selectedCurrency}
          isModal={isModal}
          handleCloseModal={this.handleCloseModal}
          handleOpenModal={this.handleOpenModal}
        />

        <Overlay isOpen={isModal} />
      </Container>
    );
  }
}
