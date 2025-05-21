import { useEffect, useState } from 'react';

import { CACHE_TTL } from '@constants/time';

interface useQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface QueryFn<T> {
  (): Promise<T>;
}

export interface CachedValue<T> {
  timestamp: number;
  data: T;
}

const memoryCache = new Map<string, CachedValue<any>>();

export function useQuery<T>(
  key: string,
  queryFn: QueryFn<T>,
  ttl: number = CACHE_TTL
): useQueryResult<T> {
  const [data, setData] = useState<T | null>(() => readCache());
  const [isLoading, setIsLoading] = useState(!memoryCache.has(key));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const now = Date.now();
    const cached = memoryCache.get(key);
    const isMemoryStale = !cached || now - cached.timestamp >= ttl;

    if (isMemoryStale) {
      fetchData();
    }
  }, [key, ttl]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      const cachedValue: CachedValue<T> = {
        timestamp: Date.now(),
        data: result,
      };

      memoryCache.set(key, cachedValue);
      localStorage.setItem(`cache_${key}`.toUpperCase(), JSON.stringify(cachedValue));

      setData(result);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  };

  function readCache(): T | null {
    const now = Date.now();

    const cached = memoryCache.get(key);
    const isMemoryReset = cached ? now - cached.timestamp < ttl : false;
    if (cached && isMemoryReset) return cached.data;

    const local = localStorage.getItem(`cache_${key}`.toUpperCase());
    if (local) {
      try {
        const parsed: CachedValue<T> = JSON.parse(local);
        const isLocalReset = now - parsed.timestamp < ttl;
        if (isLocalReset) {
          memoryCache.set(key, parsed);
          return parsed.data;
        }
      } catch (error) {}
    }

    return null;
  }

  return { data, isLoading, error };
}
