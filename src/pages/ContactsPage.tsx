import { ContactWrapper } from '@components/ContactsPage/ContactWrapper/ContactWrapper';
import { Container } from '@styles/GlobalStyle';

export const ContactsPage = () => {
  return (
    <Container data-testid="contacts-container">
      <ContactWrapper />
    </Container>
  );
};
