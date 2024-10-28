import {createTheme} from '@shopify/restyle';
import {RFValue} from '../utils/font';
export const MAX_FONT_SIZE_MULTIPLIER = 1.3;

export const palette = {
  primary: "#EB9999",
  secondary: '#F98800',
  error: '#FE5143',
  success: '#10AC84',
  black: '#171717',
  black70: '#454545',
  black50: '#727272',
  black30: '#A1A1A1',
  black10: '#E5E5E5',
  black5: '#F7F7F7',
  warning: '#FEF3E5',
};

export const spacingMetrics = {
  xs: RFValue(8),
  s: RFValue(16),
  m: RFValue(20),
  l: RFValue(30),
  xl: RFValue(40),
};

const theme = createTheme({
  breakpoints: {},
  colors: {...palette},
  spacing: {...spacingMetrics},
  textVariants: {
    defaults: {
      color: 'primary',
      fontSize: 14,
    },
    title: {
      fontSize: RFValue(19),
      lineHeight: 21,
      fontWeight: '500',
    },
    subtitle: {
        fontSize: RFValue(12),
        lineHeight: 21,
        fontWeight: '500',
      },
    caption: {
      fontSize: RFValue(12),
      lineHeight: 16,
      fontWeight: '400',
    },
    primary: {
      fontSize: RFValue(14),
      color: 'black',
      fontFamily: 'Inter-Medium',
      fontWeight: '500',
    },
    primaryDisabled: {
      color: 'black30',
    },
    primaryPressed: {
      color: 'black',
    },
  },
  buttonVariants: {
    defaults: {
      borderRadius: 's',
      backgroundColor: 'primary',
      paddingVertical: 'm',
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    primary: {
      backgroundColor: 'primary',
    },
    primaryPressed: {
      backgroundColor: 'secondary',
    },
    primaryDisabled: {
      backgroundColor: 'black10',
    },
  },
});

export type Theme = typeof theme;
export default theme;
