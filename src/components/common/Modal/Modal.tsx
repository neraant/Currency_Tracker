import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalButton, ModalCloseButton, ModalContainer, ModalTitle } from './styled';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';

interface ModalProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  isLoading?: boolean;
  buttonText: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const Modal = ({
  children,
  title,
  isOpen,
  isLoading,
  buttonText,
  onClose,
  onSubmit,
}: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!modalRef.current || !isOpen) return;

      if (!modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <>
      <ModalContainer ref={modalRef} $isModal={isOpen}>
        <ModalTitle>{title}</ModalTitle>

        <ModalCloseButton onClick={onClose}>&#10005;</ModalCloseButton>

        {children}

        <ModalButton onClick={onSubmit}>
          {isLoading ? <Spinner size="sm" /> : buttonText}
        </ModalButton>
      </ModalContainer>

      <Overlay isOpen={isOpen} onClick={onClose} />
    </>,
    modalRoot
  );
};
