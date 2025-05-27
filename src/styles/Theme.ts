import { DefaultTheme } from 'styled-components';

const BASE_SPACING = 4;

export const DarkTheme: DefaultTheme = {
  status: {
    success: '#00BC4F',
    error: '#EA3943',
    info: '#FFFFFF',
  },
  neutral: {
    black: '#000000',
    white: '#ffffff',
    green50: '#AEDF23',
    green100: '#A3DC00',
    green200: '#00CE2C',
    green300: '#16C782',
    green400: '#00BC4F',
    green500: '#24794033',
    red300: '#EA3943',
    gray300: '#A7B2C3',
    preblack: '#121212',
  },
  background: {
    primary: '#030304',
    secondary: '#202025',
    tertiary: '#1B2028',
  },
  text: {
    primary: '#D9D9D9',
    secondary: '#A7B2C3',
    tertiary: '#898989',
  },
  border: {
    primary: '#474747',
  },
  typography: {
    fontFamily: {
      inter: "'Inter', sans-serif",
      poppins: "'Poppins', sans-serif",
    },
    fontSize: {
      xs: '0.625rem',
      '2xs': '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.75rem',
      '8xl': '3.75rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      loose: 1.75,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    0: '0',
    1: `${BASE_SPACING * 1}px`,
    2: `${BASE_SPACING * 2}px`,
    3: `${BASE_SPACING * 3}px`,
    4: `${BASE_SPACING * 4}px`,
    5: `${BASE_SPACING * 5}px`,
    6: `${BASE_SPACING * 6}px`,
    8: `${BASE_SPACING * 8}px`,
    10: `${BASE_SPACING * 10}px`,
    12: `${BASE_SPACING * 12}px`,
    14: `${BASE_SPACING * 14}px`,
    16: `${BASE_SPACING * 16}px`,
    20: `${BASE_SPACING * 20}px`,
    24: `${BASE_SPACING * 24}px`,
    32: `${BASE_SPACING * 32}px`,
  },
};

export const LightTheme: DefaultTheme = {
  ...DarkTheme,
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    tertiary: '#ebebeb',
  },
  neutral: {
    ...DarkTheme.neutral,
    preblack: '#ffffff',
    gray300: '#333333',
    white: '#000000',
    black: '#ffffff',
  },
  text: {
    primary: '#121212',
    secondary: '#444444',
    tertiary: '#666666',
  },
  border: {
    primary: '#cccccc',
  },
};
