import { Container } from '@styles/GlobalStyle';

import { LargeCircle, SmallCircle, UpdateText, UpdateWrapper } from './styled';

export const UpdateComponent = () => {
  const now = new Date();

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(now);

  return (
    <div>
      <Container>
        <UpdateWrapper>
          <LargeCircle>
            <SmallCircle />
          </LargeCircle>

          <UpdateText>
            Last updated at <time dateTime={now.toISOString()}>{formattedTime}</time>
          </UpdateText>
        </UpdateWrapper>
      </Container>
    </div>
  );
};
