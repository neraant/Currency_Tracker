import { Component } from 'react';

import { Overlay } from '@components/common/Overlay/Overlay';
import { ChartComponent } from '@components/TimelinePage/ChartComponent/ChartComponent';
import { CurrencyDropDown } from '@components/TimelinePage/CurrencyDropDown/CurrencyDropDown';
import { Container } from '@styles/GlobalStyle';
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
        <CurrencyDropDown
          setCurrency={(currency: CurrencyCode) => this.setCurrency(currency)}
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
