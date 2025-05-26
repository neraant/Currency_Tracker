import { Popup } from '@components/common/Popup/Popup';
import ContactsForm from '@components/ContactsPage/ContactsForm/ContactsForm';
import { ContactsInfo } from '@components/ContactsPage/ContactsInfo/ContactsInfo';
import { ContactsInput } from '@components/ContactsPage/ContactsInput/ContactsInput';
import { CONTACT_FIELDS } from '@constants/contacts';
import { useContactForm } from '@hooks/useContactForm';
import { Container } from '@styles/GlobalStyle';
import { ContactContainer } from './styled';

export const ContactWrapper = () => {
  const {
    messageInfo,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    handlePopupClose,
    isSubmitted,
  } = useContactForm();

  return (
    <Container>
      <ContactContainer>
        <ContactsInfo />

        <ContactsForm onSubmit={handleSubmit}>
          {CONTACT_FIELDS.map((field) => (
            <ContactsInput
              key={field}
              label={field}
              value={messageInfo[field].value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isActive={messageInfo[field].isActive}
            />
          ))}
        </ContactsForm>

        <Popup isError={!isSubmitted} onPopupClose={handlePopupClose} />
      </ContactContainer>
    </Container>
  );
};
