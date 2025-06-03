import { renderHook, waitFor } from '@testing-library/react';
import { CacheKeys } from '@constants/cacheKeys';
import { CACHE_TTL } from '@constants/time';
import { useQuery, memoryCache } from './useQuery';

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
});

const mockDateNow = jest.spyOn(Date, 'now');
jest.spyOn(console, 'error').mockImplementation(() => {});

const mockQueryFn = jest.fn();
const mockLocalStorage = window.localStorage as jest.Mocked<Storage>;

jest.mock('@constants/time', () => ({
  CACHE_TTL: 5000,
}));

describe('useQuery testing', () => {
  beforeEach(() => {
    memoryCache.clear();
  });

  test('should return cached data from memory when available and fresh', () => {
    const mockData = { currencies: ['USD', 'EUR'] };
    const currentTime = 1000000;
    const cacheTimestamp = 999000;

    mockDateNow.mockReturnValue(currentTime);

    memoryCache.set(CacheKeys.CURRENCIES, {
      timestamp: cacheTimestamp,
      data: mockData,
    });

    const { result } = renderHook(() => useQuery(CacheKeys.CURRENCIES, mockQueryFn, CACHE_TTL));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    expect(mockQueryFn).not.toHaveBeenCalled();

    expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
  });

  test('should return cached data from localStorage when memory cache is stale', () => {
    const mockData = { currencies: ['USD', 'EUR'] };
    const currentTime = 1000000;
    const cacheTimestamp = 999000;

    mockDateNow.mockReturnValue(currentTime);

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        timestamp: cacheTimestamp,
        data: mockData,
      })
    );

    const { result } = renderHook(() => useQuery(CacheKeys.CURRENCIES, mockQueryFn, CACHE_TTL));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('CACHE_CURRENCIES');
    expect(mockQueryFn).not.toHaveBeenCalled();
  });

  test('should fetch data when no cache exists', async () => {
    const mockData = { currencies: ['USD', 'EUR'] };
    const currentTime = 1000000;

    mockDateNow.mockReturnValue(currentTime);
    mockLocalStorage.getItem.mockReturnValue(null);
    mockQueryFn.mockResolvedValue(mockData);

    const { result } = renderHook(() => useQuery(CacheKeys.CURRENCIES, mockQueryFn, CACHE_TTL));

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockQueryFn).toHaveBeenCalledTimes(1);
  });

  test('should handle fetch errors', async () => {
    const mockError = new Error('failure');
    const currentTime = 1000000;

    mockDateNow.mockReturnValue(currentTime);
    mockLocalStorage.getItem.mockReturnValue(null);
    mockQueryFn.mockRejectedValue(mockError);

    const { result } = renderHook(() => useQuery(CacheKeys.CURRENCIES, mockQueryFn, CACHE_TTL));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
    expect(mockQueryFn).toHaveBeenCalledTimes(2);
  });

  test('should fetch data when cache is stale', async () => {
    const mockData = { currencies: ['USD', 'EUR'] };
    const currentTime = 1000000;
    const staleTimestamp = 990000;

    mockDateNow.mockReturnValue(currentTime);
    mockQueryFn.mockResolvedValue(mockData);

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        timestamp: staleTimestamp,
        data: { currencies: ['data'] },
      })
    );

    const { result } = renderHook(() => useQuery(CacheKeys.CURRENCIES, mockQueryFn, CACHE_TTL));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockQueryFn).toHaveBeenCalled();

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'CACHE_CURRENCIES',
      expect.stringContaining('"currencies":["USD","EUR"]')
    );
  });
});
