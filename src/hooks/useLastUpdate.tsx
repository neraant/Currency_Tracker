import { useSubject } from '@context/ObserverConext';
import { CacheCode, FormattedCurrencyData } from '@typings/currency';
import { StorageUtility } from '@utils/localStorage';
import { useObserver } from './useObserver';
import { CachedValue } from './useQuery';

export const useLastUpdate = () => {
  const subject = useSubject('last_updated');
  const lastUpdated =
    useObserver(subject) ||
    StorageUtility.getItem<CachedValue<FormattedCurrencyData>>(CacheCode.CACHE_CURRENCIES)?.data
      .last_updated_at;

  return {
    lastUpdated,
  };
};
