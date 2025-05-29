import { Spin } from './styled';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

export const Spinner = ({ size, color }: SpinnerProps) => {
  return <Spin role="status" $size={size} $color={color} />;
};
