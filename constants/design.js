import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
  },
  feedback: {
    error: {
      light: '#FEE2E2',
      main: '#EF4444',
      dark: '#B91C1C',
    },
    success: {
      light: '#DCFCE7',
      main: '#22C55E',
      dark: '#15803D',
    },
    warning: {
      light: '#FEF3C7',
      main: '#F59E0B',
      dark: '#B45309',
    },
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  body1: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
  },
  body2: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SIZES = [
  { 
    value: 'square_hd',
    label: 'Square',
    description: 'Perfect for social media',
    dimensions: '1024 × 1024',
    ratio: 1,
  },
  { 
    value: 'portrait_4_3',
    label: 'Portrait',
    description: 'Great for mobile displays',
    dimensions: '768 × 1024',
    ratio: 3/4,
  },
  { 
    value: 'landscape_16_9',
    label: 'Landscape',
    description: 'Ideal for desktop wallpapers',
    dimensions: '1024 × 576',
    ratio: 16/9,
  },
];

export const STEPS = {
  FORM: 'FORM',
  LOADING: 'LOADING',
  PREVIEW: 'PREVIEW',
  GALLERY: 'GALLERY',
};
