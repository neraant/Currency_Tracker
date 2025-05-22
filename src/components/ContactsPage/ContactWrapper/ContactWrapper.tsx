import { Container } from '@styles/GlobalStyle';

import ContactsForm from '@components/ContactsPage/ContactsForm/ContactsForm';
import { ContactsInfo } from '@components/ContactsPage/ContactsInfo/ContactsInfo';
import { ContactsInput } from '@components/ContactsPage/ContactsInput/ContactsInput';

import { useContactForm } from '@hooks/useContactForm';

import { CONTACT_FIELDS } from '@constants/contacts';

import { ContactContainer } from './styled';

export const ContactWrapper = () => {
  const { messageInfo, handleChange, handleFocus, handleBlur } = useContactForm();

  return (
    <Container>
      <ContactContainer>
        <ContactsInfo />

        <ContactsForm>
          {CONTACT_FIELDS.map((field) => (
            <ContactsInput
              key={field}
              label={field}
              value={messageInfo[field].value}
              onChange={handleChange}
              onFocus={handleFocus}
              isActive={messageInfo[field].isActive}
              onBlur={handleBlur}
            />
          ))}
        </ContactsForm>
      </ContactContainer>
    </Container>
  );
};
