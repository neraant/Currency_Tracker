import { OverlayContainer } from './styled';

interface OverlayProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const Overlay = ({ isOpen, onClick }: OverlayProps) => {
  return <OverlayContainer $isOpen={isOpen} onClick={onClick} />;
};
