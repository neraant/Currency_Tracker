import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: ${({ theme }) => theme.typography.fontFamily.poppins};
	}
	body {
		position: relative;
		background-color: ${({ theme }) => theme.background.primary};
	}
	#root {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100dvh;
	}
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.text.primary};
	}
	ul {
		list-style-type: none;
	}
	button {
		background: none;
		border: none;
		outline: none;
	}
	input {
		background: transparent;
		border: none;
		outline: none;
	}
`;

export const Container = styled.div`
  max-width: 1254px;
  padding: 0px 20px;
  margin: 0 auto;
`;
