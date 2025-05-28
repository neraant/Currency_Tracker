import { InputHTMLAttributes, useState } from 'react';
import { ContactInputContainer, ContactInput, ContactLabel, ErrorText } from './styled';

interface ContactsInputProps {
  label: string;
  name: string;
  error?: string;
}

export const ContactsInput = ({
  label,
  name,
  error,
  value,
  onFocus,
  onBlur,
  ...rest
}: ContactsInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || !!value;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <ContactInputContainer>
      <ContactLabel $isActive={isActive} htmlFor={name}>
        {label}
      </ContactLabel>
      <ContactInput
        id={name}
        name={name}
        $isActive={isActive}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        {...rest}
        autoComplete="nope"
      />
      {error && <ErrorText>{error}</ErrorText>}
    </ContactInputContainer>
  );
};
