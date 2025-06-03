import { renderHook, act } from '@testing-library/react';
import { Currency, CurrencyCode } from '@typings/currency';
import { useCurrencySelection } from './useCurrencySelection';

const MOCK_CURRENCIES: Currency[] = [
  {
    code: CurrencyCode.ARS,
    name: 'Argentine Peso',
    icon: '',
    value: 203.88,
    formattedValue: 'R$ 203.88',
  },
  {
    code: CurrencyCode.AUD,
    name: 'Australian Dollar',
    icon: '',
    value: 0.27,
    formattedValue: 'R$ 0.27',
  },
  {
    code: CurrencyCode.BTC,
    name: 'Bitcoin',
    icon: '',
    value: 0,
    formattedValue: 'R$ 0.00',
  },
  {
    code: CurrencyCode.CAD,
    name: 'Canadian Dollar',
    icon: '',
    value: 0.24,
    formattedValue: 'R$ 0.24',
  },
  {
    code: CurrencyCode.CNY,
    name: 'Yuan',
    icon: '',
    value: 1.26,
    formattedValue: 'R$ 1.26',
  },
  {
    code: CurrencyCode.EUR,
    name: 'Euro',
    icon: '',
    value: 0.16,
    formattedValue: 'R$ 0.16',
  },
  {
    code: CurrencyCode.GBP,
    name: 'Libra',
    icon: '',
    value: 0.13,
    formattedValue: 'R$ 0.13',
  },
  {
    code: CurrencyCode.JPY,
    name: 'Yen',
    icon: '',
    value: 25.62,
    formattedValue: 'R$ 25.62',
  },
  {
    code: CurrencyCode.USD,
    name: 'Commercial Dollar',
    icon: '',
    value: 0.18,
    formattedValue: 'R$ 0.18',
  },
];

describe('useCurrencySelection test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('initial state is correct', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, null));

    expect(result.current.selectedCurrency).toBe('');
    expect(result.current.searchValue).toBe('');
    expect(result.current.isDropped).toBe(false);
  });

  test('opening dropdown correctly', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, CurrencyCode.USD));

    expect(result.current.isDropped).toBe(false);

    act(() => {
      result.current.handleOpenDropdown();
    });

    expect(result.current.isDropped).toBe(true);
  });

  test('closing dropdown correctly', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, CurrencyCode.USD));

    act(() => {
      result.current.handleOpenDropdown();
    });

    expect(result.current.isDropped).toBe(true);

    act(() => {
      result.current.closeDropdown();
    });

    expect(result.current.isDropped).toBe(false);
  });

  test('currency selection works correctly', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, CurrencyCode.USD));

    act(() => {
      result.current.handleSelect(CurrencyCode.ARS);
    });

    expect(result.current.selectedCurrency).toBe(CurrencyCode.ARS);
    expect(result.current.isDropped).toBe(false);
    expect(result.current.searchValue).toBe('');
  });

  test('searching currency with invalid value', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, CurrencyCode.USD));

    act(() => {
      result.current.handleSearch('invalid currency');
    });
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current.filteredCurrencies).toEqual([]);
  });

  test('searching currency correctly', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, CurrencyCode.USD));

    act(() => {
      result.current.handleSearch('yen');
    });
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current.filteredCurrencies).toEqual([
      expect.objectContaining({ code: 'JPY', name: 'Yen' }),
    ]);
  });

  test('resetCurrency resets selectedCurrency and searchValue', () => {
    const { result } = renderHook(() => useCurrencySelection(MOCK_CURRENCIES, CurrencyCode.USD));

    act(() => {
      result.current.handleSelect(CurrencyCode.EUR);
    });

    expect(result.current.selectedCurrency).toBe(CurrencyCode.EUR);

    act(() => {
      result.current.resetCurrency();
    });

    expect(result.current.selectedCurrency).toBe(CurrencyCode.USD);
    expect(result.current.searchValue).toBe('');
  });
});
