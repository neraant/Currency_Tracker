import { PureComponent } from 'react';
import { CurrencyDropDown } from '@components/common/CurrencyDropDown/CurrencyDropDown';
import { ChartComponent } from '@components/TimelinePage/ChartComponent/ChartComponent';
import { ChartSearch } from '@components/TimelinePage/ChartSearch/ChartSearch';
import { Container } from '@styles/GlobalStyle';
import { CurrencyCode } from '@typings/currency';

interface ITimelinePageState {
  selectedCurrency: CurrencyCode | '';
  isModal: boolean;
}

export class TimelinePage extends PureComponent<{}, ITimelinePageState> {
  state: ITimelinePageState = {
    selectedCurrency: CurrencyCode.USD,
    isModal: false,
  };

  setCurrency = (newCurrency: CurrencyCode | '') => {
    this.setState({ selectedCurrency: newCurrency || CurrencyCode.USD });
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
      <Container data-testid="chart-container">
        <div style={{ marginTop: '60px' }}>
          <CurrencyDropDown setCurrency={this.setCurrency} selectedCurrency={selectedCurrency}>
            {({ query, handleDropDown, handleInputChange, handleKeyDown }) => (
              <ChartSearch
                query={query}
                handleDropDown={handleDropDown}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
                selectedCurrency={selectedCurrency}
              />
            )}
          </CurrencyDropDown>
        </div>

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
