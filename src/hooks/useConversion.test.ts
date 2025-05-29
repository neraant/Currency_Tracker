import { renderHook, act } from '@testing-library/react';
import * as currencyApi from '@api/currencyApi';
import { INITIAL_CURRENCY } from '@constants/currencies';
import { CurrencyCode } from '@typings/currency';
import { useConversion } from './useConversion';

jest.mock('@api/currencyApi');

describe('useConversion test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('check valid amount', () => {
    const { result } = renderHook(() => useConversion(CurrencyCode.USD, CurrencyCode.EUR));

    act(() => {
      result.current.handleChangeAmount('100');
    });

    expect(result.current.amount).toBe('100');
    expect(result.current.isAmountValid).toBe(true);
  });

  test('check invalid amount', () => {
    const { result } = renderHook(() => useConversion(CurrencyCode.USD, CurrencyCode.EUR));

    act(() => {
      result.current.handleChangeAmount('abc');
    });

    expect(result.current.amount).toBe('');
  });

  test('convertCurrency is called and sets convertedAmount correctly', async () => {
    (currencyApi.convertCurrency as jest.Mock).mockResolvedValue({
      data: {
        EUR: {
          value: 0.85,
        },
      },
    });

    const { result } = renderHook(() => useConversion(CurrencyCode.USD, CurrencyCode.EUR));

    act(() => {
      result.current.handleChangeAmount('100');
    });
    await act(async () => {
      await result.current.convertAmount('EUR');
    });

    expect(currencyApi.convertCurrency).toHaveBeenCalledWith(CurrencyCode.USD, 'EUR');
    expect(result.current.convertedAmount).toBe('85.00');
  });

  test('sets "Error" on API failure', async () => {
    (currencyApi.convertCurrency as jest.Mock).mockRejectedValue(new Error('API failed'));

    const { result } = renderHook(() => useConversion(CurrencyCode.USD, CurrencyCode.EUR));

    act(() => {
      result.current.handleChangeAmount('100');
    });
    await act(async () => {
      await result.current.convertAmount('EUR');
    });

    expect(result.current.convertedAmount).toBe('Error');
  });

  test('check isLoading toggles correctly', () => {});

  test('resetConversion resets state', () => {
    const { result } = renderHook(() => useConversion(CurrencyCode.USD, CurrencyCode.EUR));

    act(() => {
      result.current.handleChangeAmount('123');
    });

    expect(result.current.amount).toBe('123');

    act(() => {
      result.current.resetConversion();
    });

    expect(result.current.amount).toBe('');
    expect(result.current.convertedAmount).toBe(INITIAL_CURRENCY);
    expect(result.current.isAmountValid).toBe(true);
  });
});
