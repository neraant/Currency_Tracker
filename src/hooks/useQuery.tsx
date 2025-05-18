import { useEffect, useState } from 'react';

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

const TTL = 1000 * 60 * 1000000;

export function useQuery<T>(
  key: string,
  queryFn: QueryFn<T>,
  ttl: number = TTL
): useQueryResult<T> {
  const [data, setData] = useState<T | null>(() => {
    const now = Date.now();

    const cached = memoryCache.get(key);
    if (cached && now - cached.timestamp < ttl) return cached.data;

    const local = localStorage.getItem(`cache_${key}`.toUpperCase());
    if (local) {
      try {
        const parsed: CachedValue<T> = JSON.parse(local);
        if (now - parsed.timestamp < ttl) {
          memoryCache.set(key, parsed);
          return parsed.data;
        }
      } catch (error) {}
    }

    return null;
  });

  const [isLoading, setIsLoading] = useState(!memoryCache.has(key));
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    const now = Date.now();

    const cached = memoryCache.get(key);
    if (!cached || now - cached.timestamp >= ttl) {
      fetchData();
    }
  }, [key, ttl]);

  return { data, isLoading, error };
}
