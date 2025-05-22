import { CONTACT_INFO } from '@constants/contacts';

import { ContactsInfoBlock } from './ContactsInfoBlock';
import { ContactInfoContainer, ContactInfoWrapper, ContactTitle } from './styled';

export const ContactsInfo = () => {
  return (
    <ContactInfoContainer>
      <ContactTitle>Contacts</ContactTitle>

      <ContactInfoWrapper>
        {CONTACT_INFO.map(({ title, text }) => (
          <ContactsInfoBlock key={title} title={title} text={text} />
        ))}
      </ContactInfoWrapper>
    </ContactInfoContainer>
  );
};
