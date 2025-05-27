import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    if (!isPopup) return;

    const timeout = setTimeout(() => onPopupClose(), 5000);

    return () => clearTimeout(timeout);
  }, [isPopup, onPopupClose]);

  useEffect(() => {
    if (isPopup) onPopupClose();
  }, [location]);

  return (
    <PopupWrapper $isError={isError} $isVisible={isPopup}>
      <PopupMessage>{message}</PopupMessage>

      <PopupCloseIcon onClick={onPopupClose}>&#10005;</PopupCloseIcon>
    </PopupWrapper>
  );
};
