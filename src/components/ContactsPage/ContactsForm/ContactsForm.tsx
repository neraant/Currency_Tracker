import { ReactNode } from 'react';

import { useContactForm } from '@hooks/useContactForm';

import { FormButton, FormTitle, FormWrapper } from './styled';

interface ContactsFormProps {
  children: ReactNode;
}

const ContactsForm = ({ children }: ContactsFormProps) => {
  const { handleSubmit } = useContactForm();

  return (
    <FormWrapper onSubmit={handleSubmit} autoComplete="off">
      <FormTitle>Contact form</FormTitle>
      {children}
      <FormButton type="submit">Send message</FormButton>
    </FormWrapper>
  );
};

export default ContactsForm;
