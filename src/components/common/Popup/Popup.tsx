import { useEffect } from 'react';

import { useSubject } from '@context/ObserverConext';
import { useObserver } from '@hooks/useObserver';

import { PopupCloseIcon, PopupMessage, PopupWrapper } from './styled';

interface IPopupProps {
  isError: boolean;
  handlePopupClose: () => void;
}

export const Popup = ({ isError, handlePopupClose }: IPopupProps) => {
  const subject = useSubject('notification');
  const { isPopup, message } = useObserver(subject);

  useEffect(() => {
    if (!isPopup) return;

    const timeout = setTimeout(() => handlePopupClose(), 5000);

    return () => clearTimeout(timeout);
  }, [isPopup, handlePopupClose]);

  return (
    <PopupWrapper $isError={isError} $isVisible={isPopup}>
      <PopupMessage>{message}</PopupMessage>

      <PopupCloseIcon onClick={handlePopupClose}>&#10005;</PopupCloseIcon>
    </PopupWrapper>
  );
};
