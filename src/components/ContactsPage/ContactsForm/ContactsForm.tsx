import { FormEvent, ReactNode } from 'react';

import { FormButton, FormTitle, FormWrapper } from './styled';

interface ContactsFormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
}

const ContactsForm = ({ children, onSubmit }: ContactsFormProps) => {
  return (
    <FormWrapper onSubmit={onSubmit} autoComplete="off">
      <FormTitle>Contact form</FormTitle>
      {children}
      <FormButton type="submit">Send message</FormButton>
    </FormWrapper>
  );
};

export default ContactsForm;
