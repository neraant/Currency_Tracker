import { useEffect } from 'react';
import { useSubject } from '@context/ObserverConext';
import { useObserver } from '@hooks/useObserver';
import { PopupCloseIcon, PopupMessage, PopupWrapper } from './styled';

interface IPopupProps {
  isError: boolean;
  onPopupClose: () => void;
}

export const Popup = ({ isError, onPopupClose }: IPopupProps) => {
  const subject = useSubject('notification');
  const { isPopup, message } = useObserver(subject);

  useEffect(() => {
    if (!isPopup) return;

    const timeout = setTimeout(() => onPopupClose(), 5000);

    return () => clearTimeout(timeout);
  }, [isPopup, onPopupClose]);

  return (
    <PopupWrapper $isError={isError} $isVisible={isPopup}>
      <PopupMessage>{message}</PopupMessage>

      <PopupCloseIcon onClick={onPopupClose}>&#10005;</PopupCloseIcon>
    </PopupWrapper>
  );
};
