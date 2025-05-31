import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { fetchChartData } from '@api/twelveDataApi';
import { ObserverContext } from '@context/ObserverConext';
import { Subject } from '@patterns/observer/Subject';
import { CurrencyCode } from '@typings/currency';
import { getChartConfig } from '@utils/chartConfig';
import { getRandomData } from '@utils/chartMockData';
import { parseChartData } from '@utils/parseChartData';
import { ChartComponent } from './ChartComponent';

jest.mock('@api/twelveDataApi');
jest.mock('@utils/chartMockData');
jest.mock('@utils/parseChartData');
jest.mock('@utils/chartConfig');
jest.mock('@components/common/ErrorFallback/ErrorFallback', () => ({
  ErrorFallback: ({ errorMessage }: { errorMessage: string }) => (
    <div data-testid="error-fallback">{errorMessage}</div>
  ),
}));
jest.mock('@components/common/Popup/Popup', () => ({
  Popup: ({ isError, onPopupClose }: { isError: boolean; onPopupClose: () => void }) => (
    <div data-testid="popup" onClick={onPopupClose}>
      Popup {isError ? 'Error' : 'Success'}
    </div>
  ),
}));
jest.mock('@components/common/Spinner/Spinner', () => ({
  Spinner: ({ size }: { size: string }) => <div data-testid="spinner">Loading {size}</div>,
}));
jest.mock('../ChartModal/ChartModal', () => ({
  ChartModal: ({ onSubmit, isOpenModal, handleCloseModal, defaultValues }: any) => (
    <div data-testid="chart-modal" style={{ display: isOpenModal ? 'block' : 'none' }}>
      <button onClick={handleCloseModal}>Close Modal</button>
      <button
        onClick={() =>
          onSubmit({
            time: 1640995200000,
            open: 100,
            high: 110,
            low: 90,
            close: 105,
          })
        }
      >
        Submit Edit
      </button>
    </div>
  ),
}));
jest.mock('chartjs-adapter-luxon', () => {});

jest.mock('chart.js', () => {
  const mockChartInstance = {
    destroy: jest.fn(),
    update: jest.fn(),
    data: {
      datasets: [
        {
          data: [{ x: 1640995200000, o: 100, h: 110, l: 90, c: 105 }],
        },
      ],
    },
  };

  const mockChart: any = jest.fn().mockImplementation(() => mockChartInstance);
  mockChart.register = jest.fn();

  (globalThis as any).__mockChart = mockChart;
  (globalThis as any).__mockChartInstance = mockChartInstance;

  return {
    Chart: mockChart,
    registerables: [],
    ActiveElement: {},
  };
});

jest.mock('chartjs-chart-financial', () => ({
  CandlestickController: {},
  CandlestickElement: {},
}));

jest.mock('@constants/chart', () => ({
  CHART_HEIGHT: 400,
  CHART_WIDTH: 800,
  FULL_DATA_QNTY: 30,
}));

jest.mock('@constants/currencies', () => ({
  CURRENCY_ICONS: {
    USD: '/icons/usd.png',
    EUR: '/icons/eur.png',
  },
  CURRENCY_NAMES: {
    USD: 'US Dollar',
    EUR: 'Euro',
  },
}));

const mockFetchChartData = fetchChartData as jest.MockedFunction<typeof fetchChartData>;
const mockGetRandomData = getRandomData as jest.MockedFunction<typeof getRandomData>;
const mockParseChartData = parseChartData as jest.MockedFunction<typeof parseChartData>;
const mockGetChartConfig = getChartConfig as jest.MockedFunction<typeof getChartConfig>;

const mockChartData = [
  {
    datetime: '2022-01-01T00:00:00.000Z',
    open: '100.00',
    high: '110.00',
    low: '90.00',
    close: '105.00',
  },
];

const mockParsedData = [{ x: 1640995200000, o: 100, h: 110, l: 90, c: 105 }];

const mockConfig = {
  type: 'candlestick' as const,
  data: { datasets: [{ data: mockParsedData }] },
  options: {},
};

const realSubject = {
  notification: new Subject<{ isPopup: boolean; message: string }>({
    isPopup: false,
    message: '',
  }),
  last_updated: new Subject<string | null>(null),
};

describe('ChartComponent', () => {
  const defaultProps = {
    selectedCurrency: CurrencyCode.USD,
    isModal: false,
    handleCloseModal: jest.fn(),
    handleOpenModal: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockFetchChartData.mockResolvedValue({
      values: [
        {
          datetime: '2024-01-01',
          open: '1.0',
          high: '1.2',
          low: '0.9',
          close: '1.1',
          volume: '1000',
        },
      ],
      symbol: CurrencyCode.USD,
      period: '1day',
    });
    mockGetRandomData.mockReturnValue(mockChartData);
    mockParseChartData.mockReturnValue(mockParsedData);
    mockGetChartConfig.mockReturnValue(mockConfig);

    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      fillRect: jest.fn(),
    });
  });

  const renderWithContext = (props = defaultProps) => {
    return render(
      <ObserverContext.Provider value={realSubject}>
        <ChartComponent {...props} />
      </ObserverContext.Provider>
    );
  };

  describe('Rendering', () => {
    test('renders currency information', async () => {
      renderWithContext();

      await waitFor(() => {
        expect(screen.getByText('US Dollar')).toBeInTheDocument();
        expect(screen.getByText('USD')).toBeInTheDocument();
      });
    });

    test('displays loading spinner', () => {
      renderWithContext();
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    test('renders canvas element for chart', async () => {
      renderWithContext();

      await waitFor(() => {
        const canvas = document.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });
    });

    test('renders chart modal when isModal is true', () => {
      renderWithContext({ ...defaultProps, isModal: true });

      const modal = screen.getByTestId('chart-modal');
      expect(modal).toHaveStyle({ display: 'block' });
    });
  });

  describe('Data Loading', () => {
    test('fetches chart data on component mount', async () => {
      renderWithContext();

      await waitFor(() => {
        expect(mockFetchChartData).toHaveBeenCalledWith(CurrencyCode.USD, '1day');
      });
    });

    test('uses random data fallback when API returns empty values', async () => {
      mockFetchChartData.mockResolvedValue({ values: [] });

      renderWithContext();

      await waitFor(() => {
        expect(mockGetRandomData).toHaveBeenCalled();
      });
    });

    test('refetches data on currency change', async () => {
      const { rerender } = renderWithContext();

      await waitFor(() => {
        expect(mockFetchChartData).toHaveBeenCalledWith(CurrencyCode.USD, '1day');
      });

      rerender(
        <ObserverContext value={realSubject}>
          <ChartComponent {...defaultProps} selectedCurrency={CurrencyCode.EUR} />
        </ObserverContext>
      );

      await waitFor(() => {
        expect(mockFetchChartData).toHaveBeenCalledWith(CurrencyCode.EUR, '1day');
      });
    });
  });

  describe('Error Handling', () => {
    test('displays error message when API call fails', async () => {
      const errorMessage = 'failure';
      mockFetchChartData.mockRejectedValue(new Error(errorMessage));

      renderWithContext();

      await waitFor(() => {
        expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  describe('Chart Interactions', () => {
    test('opens modal on candlestick click', async () => {
      const mockHandleOpenModal = jest.fn();

      const mockDataPoint = { x: 1640995200000, o: 100, h: 110, l: 90, c: 105 };
      const mockConfigWithData = {
        ...mockConfig,
        data: {
          datasets: [
            {
              data: [mockDataPoint],
            },
          ],
        },
      };
      mockGetChartConfig.mockReturnValue(mockConfigWithData);

      renderWithContext({ ...defaultProps, handleOpenModal: mockHandleOpenModal });

      await waitFor(() => {
        expect(mockGetChartConfig).toHaveBeenCalled();
      });

      const config = mockGetChartConfig.mock.calls[0][0];
      const onBarClick = config.onBarClick;

      const mockElements = [
        {
          index: 0,
          datasetIndex: 0,
          element: {},
        } as any,
      ];

      onBarClick(mockElements);

      await waitFor(() => {
        expect(mockHandleOpenModal).toHaveBeenCalled();
      });
    });

    test('ignores click when no chart elements are selected', async () => {
      const handleOpenModal = jest.fn();
      renderWithContext({ ...defaultProps, handleOpenModal });

      await waitFor(() => {
        expect(mockGetChartConfig).toHaveBeenCalled();
      });

      const configCall = mockGetChartConfig.mock.calls[0][0];
      const onBarClick = configCall.onBarClick;

      onBarClick([]);

      expect(handleOpenModal).not.toHaveBeenCalled();
    });
  });

  describe('Chart Modal Integration', () => {
    test('should handle chart bar editing', async () => {
      renderWithContext({ ...defaultProps, isModal: true });

      const mockChart = (globalThis as any).__mockChart;
      const mockChartInstance = (globalThis as any).__mockChartInstance;

      await waitFor(() => {
        expect(mockChart).toHaveBeenCalled();
      });

      const submitButton = screen.getByText('Submit Edit');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockChartInstance.update).toHaveBeenCalledWith('active');
      });
    });

    test('should close modal when close button is clicked', () => {
      const handleCloseModal = jest.fn();
      renderWithContext({ ...defaultProps, isModal: true, handleCloseModal });

      const closeButton = screen.getByText('Close Modal');
      fireEvent.click(closeButton);

      expect(handleCloseModal).toHaveBeenCalled();
    });
  });
});
