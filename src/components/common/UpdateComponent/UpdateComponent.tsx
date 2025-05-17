import { Container } from '@styles/GlobalStyle';

import { useObserver } from '@hooks/useObserver';
import { CachedValue } from '@hooks/useQuery';

import { useSubject } from '@context/ObserverConext';

import { formatTime } from '@utils/formatTime';
import { StorageUtility } from '@utils/localStorage';

import { LargeCircle, SmallCircle, UpdateText, UpdateWrapper } from './styled';
import { FormattedCurrencyData } from '../../../types/currency';

export const UpdateComponent = () => {
  const subject = useSubject('last_updated');
  const lastUpdated =
    useObserver(subject) ||
    StorageUtility.getItem<CachedValue<FormattedCurrencyData>>('CACHE_CURRENCIES')?.data
      .last_updated_at;

  return (
    <div>
      <Container>
        <UpdateWrapper>
          <LargeCircle>
            <SmallCircle />
          </LargeCircle>

          <UpdateText>
            Last updated at{' '}
            {lastUpdated ? (
              <time dateTime={new Date(lastUpdated).toISOString()}>{formatTime(lastUpdated)}</time>
            ) : (
              '—'
            )}
          </UpdateText>
        </UpdateWrapper>
      </Container>
    </div>
  );
};
