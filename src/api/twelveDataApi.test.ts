import { CurrencyCode } from '@typings/currency';
import { TwelveDataApiResponse } from '@typings/twelvedataapi';
import { twelveDataClient } from './clients';
import { fetchChartData } from './twelveDataApi';

jest.mock('./clients', () => ({
  twelveDataClient: {
    get: jest.fn(),
  },
}));

describe('fetchChartData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch chart data with correct params', async () => {
    const mockResponse = { data: { values: [] } } as { data: TwelveDataApiResponse };
    (twelveDataClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchChartData(CurrencyCode.JPY, '1day');

    expect(twelveDataClient.get).toHaveBeenCalledWith('/time_series', {
      params: expect.objectContaining({
        symbol: CurrencyCode.JPY,
        interval: '1day',
        apikey: expect.any(String),
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  test('should throw error when request fails', async () => {
    (twelveDataClient.get as jest.Mock).mockRejectedValue(new Error('API error'));

    await expect(fetchChartData(CurrencyCode.JPY, '1day')).rejects.toThrow('API error');
  });
});
