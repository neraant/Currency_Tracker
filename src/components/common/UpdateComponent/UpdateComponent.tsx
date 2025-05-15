import { Container } from '@styles/GlobalStyle';

import { useObserver } from '@hooks/useObserver';

import { useSubject } from '@context/ObserverConext';

import { formatTime } from '@utils/formatTime';

import { LargeCircle, SmallCircle, UpdateText, UpdateWrapper } from './styled';

export const UpdateComponent = () => {
  const subject = useSubject('last_updated');
  const lastUpdated = useObserver(subject);

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
