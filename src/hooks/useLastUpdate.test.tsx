import { renderHook } from '@testing-library/react';
import { useSubject } from '@context/ObserverConext';
import { Subject } from '@patterns/observer/Subject';
import { CacheCode } from '@typings/currency';
import { StorageUtility } from '@utils/localStorage';
import { useLastUpdate } from './useLastUpdate';
import { useObserver } from './useObserver';

jest.mock('@utils/localStorage');
jest.mock('@context/ObserverConext');
jest.mock('./useObserver');

const mockUseSubject = useSubject as jest.MockedFunction<typeof useSubject>;
const mockUseObserver = useObserver as jest.MockedFunction<typeof useObserver>;
const mockStorageUtility = StorageUtility as jest.Mocked<typeof StorageUtility>;

const realSubject = new Subject<string | null>(null);

describe('useLastUpdate testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('return lastUpdated from subject', () => {
    const mockLastUpdated = '2025-05-29T23:59:59Z';

    jest.spyOn(realSubject, 'addObserver').mockImplementation(jest.fn());
    jest.spyOn(realSubject, 'removeObserver').mockImplementation(jest.fn());
    jest.spyOn(realSubject, 'getState').mockImplementation(() => mockLastUpdated);
    jest.spyOn(realSubject, 'setState').mockImplementation(jest.fn());
    jest.spyOn(realSubject, 'notify').mockImplementation(jest.fn());

    mockUseSubject.mockReturnValue(realSubject);
    mockUseObserver.mockReturnValue(mockLastUpdated);

    const { result } = renderHook(() => useLastUpdate());

    expect(mockUseSubject).toHaveBeenCalledWith('last_updated');
    expect(mockUseObserver).toHaveBeenCalledWith(realSubject);
    expect(result.current.lastUpdated).toBe(mockLastUpdated);
  });

  test('return lastUpdated from localStorage', () => {
    const mockCachedData = {
      data: {
        last_updated_at: '2024-01-14T15:45:00Z',
        currencies: [],
      },
      timestamp: Date.now(),
    };

    mockUseSubject.mockReturnValue(realSubject);
    mockUseObserver.mockReturnValue(null);
    mockStorageUtility.getItem.mockReturnValue(mockCachedData);

    const { result } = renderHook(() => useLastUpdate());

    expect(mockStorageUtility.getItem).toHaveBeenCalledWith(CacheCode.CACHE_CURRENCIES);
    expect(result.current.lastUpdated).toBe(mockCachedData.data.last_updated_at);
  });

  test('updating value changing in observer', () => {
    const firstValue = '2025-05-29T22:59:59Z';
    const secondValue = '2025-05-29T23:59:59Z';

    mockUseSubject.mockReturnValue(realSubject);
    mockUseObserver.mockReturnValueOnce(firstValue);

    const { result, rerender } = renderHook(() => useLastUpdate());

    expect(result.current.lastUpdated).toBe(firstValue);

    mockUseObserver.mockReturnValueOnce(secondValue);
    rerender();

    expect(result.current.lastUpdated).toBe(secondValue);
  });

  test('throw error trying get access to localStorage', () => {
    mockUseSubject.mockReturnValue(realSubject);
    mockUseObserver.mockReturnValue(null);
    mockStorageUtility.getItem.mockImplementation(() => {
      throw new Error('Storage access error');
    });

    expect(() => {
      renderHook(() => useLastUpdate());
    }).toThrow('Storage access error');
  });

  test('using correct cache key', () => {
    mockUseSubject.mockReturnValue(realSubject);
    mockUseObserver.mockReturnValue(null);
    mockStorageUtility.getItem.mockReturnValue(null);

    renderHook(() => useLastUpdate());

    expect(mockStorageUtility.getItem).toHaveBeenCalledWith(CacheCode.CACHE_CURRENCIES);
  });
});
