import { OverlayContainer } from './styled';

interface OverlayProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const Overlay = ({ isOpen, onClick }: OverlayProps) => {
  return <OverlayContainer data-testid="overlay" $isOpen={isOpen} onClick={onClick} />;
};
