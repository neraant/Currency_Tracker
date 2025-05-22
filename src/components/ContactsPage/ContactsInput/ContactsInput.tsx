import { ChangeEvent, FocusEvent, forwardRef } from 'react';

import { ContactInputContainer, ContactInput, ContactLabel } from './styled';

interface ContactsInputProps {
  value: string;
  label: string;
  isActive: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const ContactsInput = ({
  value,
  label,
  isActive,
  onChange,
  onFocus,
  onBlur,
}: ContactsInputProps) => {
  return (
    <ContactInputContainer>
      <ContactLabel $isActive={isActive} htmlFor={label}>
        {label}
      </ContactLabel>

      <ContactInput
        $isActive={isActive}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="nope"
      />
    </ContactInputContainer>
  );
};
