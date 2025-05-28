import { Fragment } from 'react/jsx-runtime';

import { InfoBlock, InfoBlockText, InfoBlockTitle } from './styled';

interface ContactsInfoBlock {
  title: string;
  text: string[];
}

export const ContactsInfoBlock = ({ title, text }: ContactsInfoBlock) => {
  return (
    <InfoBlock>
      <InfoBlockTitle>{title}</InfoBlockTitle>

      <InfoBlockText>
        {text.map((value) => (
          <Fragment key={value}>
            {value} <br />
          </Fragment>
        ))}
      </InfoBlockText>
    </InfoBlock>
  );
};
