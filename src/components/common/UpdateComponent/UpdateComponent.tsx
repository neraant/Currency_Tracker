import { useLastUpdate } from '@hooks/useLastUpdate';
import { Container } from '@styles/GlobalStyle';
import { formatTime } from '@utils/formatTime';

import { LargeCircle, SmallCircle, UpdateText, UpdateWrapper } from './styled';

export const UpdateComponent = () => {
  const { lastUpdated } = useLastUpdate();

  const isoDate = lastUpdated ? new Date(lastUpdated).toISOString() : '';
  const formattedTime = lastUpdated ? formatTime(lastUpdated) : '';

  return (
    <div>
      <Container>
        <UpdateWrapper>
          <LargeCircle>
            <SmallCircle />
          </LargeCircle>

          <UpdateText>
            Last updated at {lastUpdated ? <time dateTime={isoDate}>{formattedTime}</time> : '—'}
          </UpdateText>
        </UpdateWrapper>
      </Container>
    </div>
  );
};
