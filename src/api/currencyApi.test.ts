import { CurrencyApiResponse, CurrencyCode, CurrencyDetail } from '@typings/currency';
import { formatCurrencyData } from '@utils/formatCurrencyData';
import { currencyApiClient } from './clients';
import { fetchCurrencyData, convertCurrency } from './currencyApi';

jest.mock('./clients', () => ({
  currencyApiClient: {
    get: jest.fn(),
  },
}));

jest.mock('@utils/formatCurrencyData', () => ({
  formatCurrencyData: jest.fn(),
}));

describe('currencyApi functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchCurrencyData - makes API call and formats data', async () => {
    const mockResponse = { data: { data: {} } } as { data: CurrencyApiResponse };
    (currencyApiClient.get as jest.Mock).mockResolvedValue(mockResponse);

    const formatted = { USD: { value: 1.0 } };
    (formatCurrencyData as jest.Mock).mockReturnValue(formatted);

    const result = await fetchCurrencyData();

    expect(currencyApiClient.get).toHaveBeenCalledWith(
      '',
      expect.objectContaining({
        params: expect.objectContaining({ base_currency: expect.any(String) }),
      })
    );
    expect(formatCurrencyData).toHaveBeenCalledWith(mockResponse);
    expect(result).toEqual(formatted);
  });

  test('convertCurrency - makes API call and returns raw data', async () => {
    const mockDetail = { data: { value: 0.93 } } as { data: CurrencyDetail };
    (currencyApiClient.get as jest.Mock).mockResolvedValue(mockDetail);

    const result = await convertCurrency(CurrencyCode.USD, CurrencyCode.EUR);

    expect(currencyApiClient.get).toHaveBeenCalledWith('', {
      params: {
        apikey: expect.any(String),
        base_currency: CurrencyCode.USD,
        currencies: CurrencyCode.EUR,
      },
    });
    expect(result).toEqual(mockDetail);
  });

  test('fetchCurrencyData - throws error on failure', async () => {
    (currencyApiClient.get as jest.Mock).mockRejectedValue(new Error('API failed'));

    await expect(fetchCurrencyData()).rejects.toThrow('API failed');
  });
});
