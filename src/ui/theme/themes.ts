import { ImageSourcePropType } from 'react-native';
import { BRAND_ID } from '../../utils/constants';

export type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
  border: string;
  placeholder: string;
};

export type TypographyPalette = {
  fontFamily: string;
  weights: {
    regular: string;
    medium: string;
    semiBold: string;
    bold: string;
  };
  sizes: {
    caption4: { fontSize: number; lineHeight: number };
    caption2: { fontSize: number; lineHeight: number };
    caption1: { fontSize: number; lineHeight: number };
    body3: { fontSize: number; lineHeight: number };
    body2: { fontSize: number; lineHeight: number };
    body1: { fontSize: number; lineHeight: number };
    buttonMedium: { fontSize: number; lineHeight: number };
    buttonLink: { fontSize: number; lineHeight: number };
    title4: { fontSize: number; lineHeight: number };
    title3: { fontSize: number; lineHeight: number };
    title2: { fontSize: number; lineHeight: number };
    title1: { fontSize: number; lineHeight: number };
    inputText: { fontSize: number; lineHeight: number | 'auto' };
    helperText: { fontSize: number; lineHeight: number };
    labelText: { fontSize: number; lineHeight: number | 'auto' };
  };
};

export type Theme = {
  brandId: string;
  colors: ColorPalette;
  typography: TypographyPalette;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  shadows: {
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  logo: ImageSourcePropType;
  logoIcon: ImageSourcePropType;
};

// --- HeimApo Theme (DocMorris Brand) ---
export const heimApoTheme: Theme = {
  brandId: BRAND_ID.HEIM_APO,
  colors: {
    primary: '#00463D',
    secondary: '#00D264',
    accent: '#E6007E',
    background: '#F2F2F2',
    surface: '#FFFFFF',
    textPrimary: '#343434',
    textSecondary: '#535353',
    textMuted: '#727272',
    success: '#108455',
    warning: '#ffc107',
    error: '#dc3545',
    border: '#DODODO',
    placeholder: '#727272',
  },
  typography: {
    fontFamily: 'Poppins',
    weights: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    sizes: {
      buttonMedium: { fontSize: 14, lineHeight: 22 },
      buttonLink: { fontSize: 13, lineHeight: 18 },
      caption4: { fontSize: 6, lineHeight: 9 },
      caption2: { fontSize: 10, lineHeight: 15 },
      caption1: { fontSize: 12, lineHeight: 18 },
      body3: { fontSize: 13, lineHeight: 24 },
      body2: { fontSize: 14, lineHeight: 21 },
      body1: { fontSize: 16, lineHeight: 24 },
      title4: { fontSize: 13, lineHeight: 20 },
      title3: { fontSize: 16, lineHeight: 24 },
      title2: { fontSize: 18, lineHeight: 27 },
      title1: { fontSize: 28, lineHeight: 34 },
      inputText: { fontSize: 18, lineHeight: 'auto' },
      helperText: { fontSize: 12, lineHeight: 18 },
      labelText: { fontSize: 10, lineHeight: 'auto' },
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
  },
  logoIcon: require('../../../assets/heimApo/logoIcon.png'),
  logo: require('../../../assets/heimApo/logo.png'),
};

// --- SmartPill Theme (Brand B) ---
export const smartPillTheme: Theme = {
  brandId: BRAND_ID.SMART_PILL,
  colors: {
    primary: '#7B2C8D',
    secondary: '#FFC800',
    accent: '#00B099',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#333333',
    textSecondary: '#666666',
    textMuted: '#999999',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#EF5350',
    border: '#EAEAEA',
    placeholder: '#BDBDBD',
  },
  typography: {
    fontFamily: 'Poppins',
    weights: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    sizes: {
      buttonMedium: { fontSize: 14, lineHeight: 22 },
      buttonLink: { fontSize: 13, lineHeight: 18 },
      caption4: { fontSize: 6, lineHeight: 9 },
      caption2: { fontSize: 10, lineHeight: 15 },
      caption1: { fontSize: 12, lineHeight: 18 },
      body3: { fontSize: 13, lineHeight: 24 },
      body2: { fontSize: 14, lineHeight: 21 },
      body1: { fontSize: 16, lineHeight: 24 },
      title4: { fontSize: 13, lineHeight: 20 },
      title3: { fontSize: 16, lineHeight: 24 },
      title2: { fontSize: 18, lineHeight: 27 },
      title1: { fontSize: 28, lineHeight: 34 },
      inputText: { fontSize: 18, lineHeight: 'auto' },
      helperText: { fontSize: 12, lineHeight: 18 },
      labelText: { fontSize: 10, lineHeight: 'auto' },
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  logoIcon: require('../../../assets/smartPill/logoIcon.png'),
  logo: require('../../../assets/smartPill/logo.png'),
};
