import 'chartjs-adapter-luxon';

import { ContextType, createRef, PureComponent } from 'react';

import { ActiveElement, Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

import { fetchChartData } from '@api/twelveDataApi';
import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { Popup } from '@components/common/Popup/Popup';
import { Spinner } from '@components/common/Spinner/Spinner';
import { CHART_HEIGHT, CHART_WIDTH, FULL_DATA_QNTY } from '@constants/chart';
import { CURRENCY_ICONS, CURRENCY_NAMES } from '@constants/currencies';
import { ObserverContext } from '@context/ObserverConext';
import { IChartBar, IChartBarFormData, IChartDataPoint, IChartEntry } from '@typings/chart';
import { CurrencyCode } from '@typings/currency';
import { getChartConfig } from '@utils/chartConfig';
import { getRandomData } from '@utils/chartMockData';
import { parseChartData } from '@utils/parseChartData';

import {
  CurrencyImage,
  CurrencyInfoTexts,
  CurrencyInfoWrapper,
  CurrencyText,
  CurrencyTitle,
} from './styled';
import { ChartModal } from '../ChartModal/ChartModal';

Chart.register(...registerables, CandlestickController, CandlestickElement);

interface IChartComponentProps {
  selectedCurrency: CurrencyCode;
  isModal: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
}

interface IChartComponentState {
  chartData: IChartEntry[];
  date: string;
  isLoading: boolean;
  error: string | null;
  chartBar: IChartBar;
}

export class ChartComponent extends PureComponent<IChartComponentProps, IChartComponentState> {
  static contextType = ObserverContext;
  context!: ContextType<typeof ObserverContext>;

  chartRef = createRef<HTMLCanvasElement>();
  chartInstance: Chart<'candlestick'> | null = null;

  state: IChartComponentState = {
    chartData: [],
    date: '1day',
    isLoading: false,
    error: null,
    chartBar: {},
  };

  async componentDidMount() {
    await this.loadData();
  }

  componentDidUpdate(prevProps: Readonly<IChartComponentProps>): void {
    if (prevProps.selectedCurrency !== this.props.selectedCurrency) {
      this.loadData();
    }
  }

  componentWillUnmount(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  async loadData() {
    this.setState({ isLoading: true });

    try {
      const data = await fetchChartData(this.props.selectedCurrency, this.state.date);
      const isData = Array.isArray(data?.values) && data.values.length > 0;

      const chartData = isData ? data.values : getRandomData();

      this.setState({ chartData }, () => {
        this.renderChart();
        if (isData && data.values.length === FULL_DATA_QNTY) {
          this.handlePopupOpen();
        }
      });

      this.setState({ error: null });
    } catch (error: unknown) {
      console.error('Error while fetching chart data: ', error);

      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

      this.setState({ error: errorMessage });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  renderChart() {
    if (!this.chartRef.current || this.state.chartData.length === 0) return;

    const ctx = this.chartRef.current.getContext('2d');
    if (!ctx) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const parsedData = parseChartData(this.state.chartData);

    const config = getChartConfig({
      data: parsedData,
      onBarClick: this.handleBarClick,
    });

    this.chartInstance = new Chart(ctx, config);
  }

  handleBarClick = (elements: ActiveElement[]) => {
    if (elements.length === 0) return;

    const { index } = elements[0];
    const dataset = this.chartInstance?.data.datasets[0];

    if (dataset && dataset.data) {
      const barData: IChartDataPoint = dataset.data[index];

      const open = parseFloat(barData.o.toFixed(2));
      const high = parseFloat(barData.h.toFixed(2));
      const low = parseFloat(barData.l.toFixed(2));
      const close = parseFloat(barData.c.toFixed(2));

      this.setState(
        {
          chartBar: {
            open,
            high,
            low,
            close,
            timestamp: barData.x,
          },
        },
        () => {
          this.props.handleOpenModal();
        }
      );
    }
  };

  handleEditBar = (newBar: IChartBarFormData) => {
    const newEntry = {
      datetime: new Date(newBar.time).toISOString(),
      open: newBar.open.toString(),
      high: newBar.high.toString(),
      low: newBar.low.toString(),
      close: newBar.close.toString(),
    };

    this.setState(
      (prevState) => {
        const updatedData = prevState.chartData.map((entry) =>
          new Date(entry.datetime).getTime() === newBar.time ? newEntry : entry
        );

        return { chartData: updatedData };
      },
      () => this.renderChart()
    );
  };

  handlePopupClose = () => {
    const subject = this.context?.notification;

    subject?.setState({
      isPopup: false,
      message: 'Success! Diagram created in 30 days!',
    });
  };

  handlePopupOpen = () => {
    const subject = this.context?.notification;

    subject?.setState({
      isPopup: true,
      message: 'Success! Diagram created in 30 days!',
    });
  };

  render() {
    const { selectedCurrency, isModal, handleCloseModal } = this.props;
    const { isLoading, error, chartBar } = this.state;

    return (
      <>
        <CurrencyInfoWrapper>
          <CurrencyImage src={CURRENCY_ICONS[selectedCurrency]} alt={selectedCurrency} />
          <CurrencyInfoTexts>
            <CurrencyTitle>{CURRENCY_NAMES[selectedCurrency]}</CurrencyTitle>
            <CurrencyText>{selectedCurrency}</CurrencyText>
          </CurrencyInfoTexts>
          {isLoading && <Spinner size="lg" />}
        </CurrencyInfoWrapper>

        {error ? (
          <ErrorFallback errorMessage={error} />
        ) : (
          <canvas ref={this.chartRef} width={CHART_WIDTH} height={CHART_HEIGHT} />
        )}

        <ChartModal
          onSubmit={this.handleEditBar}
          isModal={isModal}
          handleCloseModal={handleCloseModal}
          defaultValues={chartBar}
        />

        <Popup isError={false} handlePopupClose={this.handlePopupClose} />
      </>
    );
  }
}
