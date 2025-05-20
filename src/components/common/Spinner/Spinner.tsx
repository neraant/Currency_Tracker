import { Spin } from './styled';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Spinner = ({ size }: SpinnerProps) => {
  return <Spin $size={size} />;
};
