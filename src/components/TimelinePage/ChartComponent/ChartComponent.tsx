import { Component, Context, ContextType, createRef } from 'react';

import 'chartjs-adapter-luxon';

import { ActiveElement, Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

import { DarkTheme } from '@styles/Theme';

import { ErrorFallback } from '@components/common/ErrorFallback/ErrorFallback';
import { Popup } from '@components/common/Popup/Popup';
import { Spinner } from '@components/common/Spinner/Spinner';

import { fetchChartData } from '@api/twelveDataApi';

import { ObserverContext } from '@context/ObserverConext';

import { IChartBar, IChartEntry } from '@typings/chart';
import { getRandomData } from '@utils/chartMockData';

import { CURRENCY_ICONS, CURRENCY_NAMES } from '@constants/Currencies';

import {
  CurrencyImage,
  CurrencyInfoTexts,
  CurrencyInfoWrapper,
  CurrencyText,
  CurrencyTitle,
} from './styled';

import { AxiosError } from 'axios';

import { ChartModal } from '../ChartModal/ChartModal';

Chart.register(...registerables, CandlestickController, CandlestickElement);

interface IChartComponentProps {
  selectedCurrency: string;
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

export class ChartComponent extends Component<IChartComponentProps, IChartComponentState> {
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

      if (Array.isArray(data?.values) && data.values.length > 0) {
        this.setState({ chartData: data.values }, () => {
          this.renderChart();
          if (data.values.length === 30) {
            this.handlePopupOpen();
          }
        });
      } else {
        const fallback = getRandomData();
        this.setState({ chartData: fallback }, () => {
          this.renderChart();
          if (fallback.length === 30) {
            this.handlePopupOpen();
          }
        });
      }
      this.setState({ error: null });
    } catch (error: unknown) {
      console.error('Error while fetching chart data: ', error);

      if (error instanceof AxiosError) {
        this.setState({ error: error.message });
      } else if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'An unknown error occurred' });
      }
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

    const parsedData = this.state.chartData.map((entry) => ({
      x: new Date(entry.datetime).getTime(),
      o: parseFloat(entry.open),
      h: parseFloat(entry.high),
      l: parseFloat(entry.low),
      c: parseFloat(entry.close),
    }));

    this.chartInstance = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            data: parsedData,
            backgroundColors: {
              up: DarkTheme.neutral.green300,
              down: DarkTheme.neutral.red300,
              unchanged: '',
            },
            borderColors: {
              up: DarkTheme.neutral.green300,
              down: DarkTheme.neutral.red300,
              unchanged: '',
            },
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: 'nearest',
            intersect: true,
            borderColor: '#474747',
            backgroundColor: DarkTheme.background.primary,
            titleColor: DarkTheme.text.primary,
            bodyColor: DarkTheme.text.primary,
            borderWidth: 1,
            displayColors: false,
            padding: 12,
            cornerRadius: 6,
            titleFont: {
              size: 13,
              weight: 'bold',
            },
            bodyFont: {
              size: 12,
            },
            callbacks: {
              label: function (context) {
                const raw = context.raw as { o: number; h: number; l: number; c: number };
                const { o, h, l, c } = raw;
                return `O: ${o}, H: ${h}, L: ${l}, C: ${c}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            adapters: {
              date: {
                zone: 'utc',
              },
            },
          },
          y: {
            type: 'linear',
          },
        },
        onClick: (event) => {
          const elements = this.chartInstance?.getElementsAtEventForMode(
            event as unknown as Event,
            'nearest',
            { intersect: true },
            false
          );
          this.handleBarClick(elements || []);
        },
      },
    });
  }

  handleBarClick = (elements: ActiveElement[]) => {
    if (elements.length === 0) return;

    const { index } = elements[0];
    const dataset = this.chartInstance?.data.datasets[0];

    if (dataset && dataset.data) {
      const barData = dataset.data[index] as {
        x: number;
        o: number;
        h: number;
        l: number;
        c: number;
      };

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

  handleEditBar = (newBar: {
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
  }) => {
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
          <canvas ref={this.chartRef} width={1000} height={400} />
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
