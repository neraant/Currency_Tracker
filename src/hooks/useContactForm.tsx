import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';

import { useSubject } from '@context/ObserverConext';

import { CONTACT_INPUTS, FieldKey } from '@typings/contacts';

export const useContactForm = () => {
  const [messageInfo, setMessageInfo] = useState({
    [CONTACT_INPUTS.NAME]: { value: '', isActive: false, isValid: false },
    [CONTACT_INPUTS.EMAIL]: { value: '', isActive: false, isValid: false },
    [CONTACT_INPUTS.MESSAGE]: { value: '', isActive: false, isValid: false },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const subject = useSubject('notification');

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

  const resetForm = () => {
    setMessageInfo({
      [CONTACT_INPUTS.NAME]: { value: '', isActive: false, isValid: false },
      [CONTACT_INPUTS.EMAIL]: { value: '', isActive: false, isValid: false },
      [CONTACT_INPUTS.MESSAGE]: { value: '', isActive: false, isValid: false },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let updatedInfo: typeof messageInfo;
    let allValid: boolean;

    // Сначала обновим поля и проверим валидность
    updatedInfo = Object.keys(messageInfo).reduce(
      (acc, key) => {
        const fieldKey = key as FieldKey;
        const value = messageInfo[fieldKey].value;

        acc[fieldKey] = {
          value,
          isActive: true,
          isValid: validateField(fieldKey, value),
        };

        return acc;
      },
      {} as typeof messageInfo
    );

    allValid = Object.values(updatedInfo).every((field) => field.isValid);

    setMessageInfo(updatedInfo);

    if (allValid) {
      const successMsg = 'Success! Your message was sent!';
      setMessage(successMsg);
      setIsSubmitted(true);
      resetForm();

      setTimeout(() => handlePopupOpen(successMsg), 0);
    } else {
      const errorMsg = 'Error! Invalid data!';
      setMessage(errorMsg);
      setIsSubmitted(false);

      setTimeout(() => handlePopupOpen(errorMsg), 0);
    }
  };

  const handlePopupOpen = (msg: string) => {
    if (subject?.setState) {
      subject.setState({
        isPopup: true,
        message: msg,
      });
    }
  };

  const handlePopupClose = () => {
    subject.setState({
      isPopup: false,
      message: message,
    });
  };

  return {
    messageInfo,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    handlePopupClose,
    isSubmitted,
    isFormValid: Object.values(messageInfo).every((field) => field.isValid),
  };
};
