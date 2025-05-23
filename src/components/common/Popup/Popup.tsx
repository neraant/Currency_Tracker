import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useObserver } from '@hooks/useObserver';

import { useSubject } from '@context/ObserverConext';

import { PopupCloseIcon, PopupMessage, PopupWrapper } from './styled';

interface IPopupProps {
  isError: boolean;
  onClose: () => void;
}

export const Popup = ({ isError = false, onClose }: IPopupProps) => {
  const subject = useSubject('notification');
  const { isPopup, message } = useObserver(subject);
  const location = useLocation();

  useEffect(() => {
    subject.setState({
      isPopup: false,
      message: '',
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!isPopup) return;

    const timeout = setTimeout(() => onClose(), 3000);

    return () => clearTimeout(timeout);
  }, [isPopup, onClose]);

  return (
    <PopupWrapper $isError={isError} $isVisible={isPopup}>
      <PopupMessage>{message}</PopupMessage>

      <PopupCloseIcon onClick={onClose}>&#10005;</PopupCloseIcon>
    </PopupWrapper>
  );
};
