import { OverlayContainer } from './styled';

interface OverlayProps {
  isOpen: boolean;
}

export const Overlay = ({ isOpen }: OverlayProps) => {
  return <OverlayContainer $isOpen={isOpen} />;
};
