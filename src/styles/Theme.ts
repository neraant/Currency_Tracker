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
    green50: '#AEDF23', // Градиент2
    green100: '#A3DC00', // Градиент3
    green200: '#00CE2C', // Градиент1
    green300: '#16C782', // Свечи
    green400: '#00BC4F', // Индикатор
    green500: '#24794033', // Индикатор
    red300: '#EA3943', // Свечи,
    gray300: '#A7B2C3',
    preblack: '#121212',
  },

  background: {
    primary: '#030304', // main bg
    secondary: '#202025', //cards
    tertiary: '#1B2028', // input
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
      xs: '0.625rem', // 10px
      '2xs': '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.75rem', // 76px
      '8xl': '3.75rem', // 90px
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
    1: `${BASE_SPACING * 1}px`, // 4px
    2: `${BASE_SPACING * 2}px`, // 8px
    3: `${BASE_SPACING * 3}px`, // 12px
    4: `${BASE_SPACING * 4}px`, // 16px
    5: `${BASE_SPACING * 5}px`, // 20px
    6: `${BASE_SPACING * 6}px`, // 24px
    8: `${BASE_SPACING * 8}px`, // 32px
    10: `${BASE_SPACING * 10}px`, // 40px
    12: `${BASE_SPACING * 12}px`, // 48px
    16: `${BASE_SPACING * 16}px`, // 64px
    20: `${BASE_SPACING * 20}px`, // 80px
    24: `${BASE_SPACING * 24}px`, // 96px
    32: `${BASE_SPACING * 32}px`, // 128px
  },
};
