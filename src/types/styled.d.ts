import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    status: {
      success: string;
      error: string;
      info: string;
    };
    neutral: {
      black: string;
      white: string;
      green50: string;
      green100: string;
      green200: string;
      green300: string;
      green400: string;
      green500: string;
      red300: string;
      gray300: string;
      preblack: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: {
      primary: string;
    };
    typography: {
      fontFamily: {
        inter: string;
        poppins: string;
      };
      fontSize: {
        [key: string]: string;
      };
      fontWeight: {
        light: string;
        regular: string;
        medium: string;
        semibold: string;
        bold: string;
      };
      lineHeight: {
        [key: string]: number;
      };
      letterSpacing: {
        [key: string]: string;
      };
    };
    spacing: {
      [key: string]: string;
    };
    scrollbar: {
      thumb: string;
      thumbHover: string;
    };
  }
}
