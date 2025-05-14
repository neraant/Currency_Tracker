import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: ${({ theme }) => theme.typography.fontFamily.poppins};
	}
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.text.primary};
	}
`;

export const Container = styled.div`
  max-width: 1254px;
  padding: 0px 15px;
  margin: 0 auto;
`;
