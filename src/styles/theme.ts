// Palette et styles globaux pour l'app
export const COLORS = {
  primary: '#388e3c',
  secondary: '#b2dfdb',
  accent: '#7bbf8b',
  error: '#e57373',
  info: '#1976d2',
  background: '#e8f5e9',
  text: '#1a3d5d',
  white: '#fff',
  light: '#f1f8e9',
  grey: '#f5f5f5',
};

export const COMMON_STYLES = {
  rounded: {
    borderRadius: 12,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 1,
  },
  centered: {
    alignItems: /** @type {import('react-native').FlexAlignType} */ ('center'),
    justifyContent: /** @type {"center"} */ ('center'),
  },
};
