import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

import { CONTACT_INPUTS, FieldKey } from '@typings/contacts';

export const useContactForm = () => {
  const [messageInfo, setMessageInfo] = useState({
    [CONTACT_INPUTS.NAME]: { value: '', isActive: false, isValid: false },
    [CONTACT_INPUTS.EMAIL]: { value: '', isActive: false, isValid: false },
    [CONTACT_INPUTS.MESSAGE]: { value: '', isActive: false, isValid: false },
  });

  const validateField = (key: FieldKey, value: string) => {
    switch (key) {
      case 'name':
        return value.trim().length > 1;
      case 'email':
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      case 'message':
        return value.trim().length > 5;
      default:
        return true;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as FieldKey;

    setMessageInfo((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
        isValid: validateField(key, value),
      },
    }));
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as FieldKey;

    setMessageInfo((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        isActive: true,
      },
    }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as FieldKey;

    setMessageInfo((prev) => {
      const value = prev[key].value;
      const hasValue = !!value.trim();

      return {
        ...prev,
        [key]: {
          ...prev[key],
          isActive: hasValue,
          isValid: validateField(key, value),
        },
      };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setMessageInfo((prev) => {
      const updated = { ...prev };

      (Object.keys(updated) as FieldKey[]).forEach((key) => {
        const value = updated[key].value;
        updated[key] = {
          ...updated[key],
          isActive: true,
          isValid: validateField(key, value),
        };
      });

      const allValid = Object.values(updated).every((field) => field.isValid);

      if (allValid) {
        console.log('VALID');
      } else {
        console.log('NOT VALID');
      }

      return updated;
    });
  };

  const isFormValid = () => {
    return Object.values(messageInfo).every((field) => field.isValid && field.value.trim());
  };

  return {
    messageInfo,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    isFormValid: isFormValid(),
  };
};
