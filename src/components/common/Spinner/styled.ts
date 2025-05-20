import styled, { css } from 'styled-components';

interface SpinProps {
  $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

export const Spin = styled.span<SpinProps>`
  width: ${({ $size }) => sizeMap[$size || 'lg']};
  height: ${({ $size }) => sizeMap[$size || 'lg']};
	border: 5px solid #FFF;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
	0% {
			transform: rotate(0deg);
	}
	100% {
			transform: rotate(360deg);
	}
`;
