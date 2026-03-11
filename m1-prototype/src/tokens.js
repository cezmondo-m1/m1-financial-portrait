// M1 Design Tokens — extracted from Figma design system
// Never hardcode color, spacing, radius, or typography values — use these tokens.

export const LIGHT = {
  // Foreground
  fgNeutralMain: '#1C2026',
  fgNeutralSecondary: '#546073',
  fgNeutralTertiary: '#8F9BAE',
  fgNeutralInverse: '#FFFFFF',
  fgPrimary: '#2A7DA7',
  fgPrimaryShade: '#1F5B7A',
  fgSecondary: '#152B56',
  fgSecondaryTint: '#99ADD5',
  fgSuccess: '#1F7C3E',
  fgSuccessTint: '#279D4F',
  fgCritical: '#B3485A',
  fgWarning: '#EDD17B',
  fgWarningShade: '#7A631F',
  fgPromotion: '#D6A55C',

  // Background
  bgNeutralPrimary: '#FFFFFF',
  bgNeutralSecondary: '#F3F5F8',
  bgNeutralTertiary: '#E8ECF2',
  bgElevation1: '#FFFFFF',
  bgElevation2: '#FFFFFF',
  bgInfoSubtle: '#E8EDF5',
  bgSuccessSubtle: '#E9F6EE',
  bgWarningSubtle: '#FBF4DF',
  bgCriticalSubtle: '#F6E9EB',
  bgPrimarySubtle: '#E5EFF4',
  bgFeatureFlat: '#152B56',
  bgShadow: '#546073',

  // Border
  borderMain: '#D4DBE6',
  borderActive: '#2A7DA7',
  borderCritical: '#D08E99',
  borderInfo: '#99ADD5',
  borderSuccess: '#92D2A8',
  borderWarning: '#EDD17B',

  // Chart
  chartDatapoint1: '#3C5A94',
  chartDatapoint2: '#99ADD5',
  chartDatapoint3: '#CCD6EA',
  chartDatapoint4: '#152B56',
  chartBgPlot: '#D4DBE6',

  // Primitives (commonly used directly)
  teal04: '#2A7DA7',
  blue02: '#CCD6EA',
  blue03: '#99ADD5',
  blue04: '#3C5A94',
  blue05: '#152B56',
  grey00: '#FFFFFF',
  grey01: '#F3F5F8',
  grey02: '#E8ECF2',
  grey03: '#D4DBE6',
  grey04: '#8F9BAE',
  grey05: '#546073',
  grey06: '#1C2026',

  // Shadows
  shadow1: 'drop-shadow(0px 0px 16px rgba(84,96,115,0.2))',
  shadow2: 'drop-shadow(0px 0px 24px rgba(83,96,115,0.2))',
};

export const DARK = {
  fgNeutralMain: '#ECEFF4',
  fgNeutralSecondary: '#8F9BAE',
  fgNeutralTertiary: '#5E6D82',
  fgNeutralInverse: '#0F1115',
  fgPrimary: '#6FA7C3',
  fgPrimaryShade: '#2A7DA7',
  fgSecondary: '#152B56',
  fgSecondaryTint: '#99ADD5',
  fgSuccess: '#1F7C3E',
  fgSuccessTint: '#279D4F',
  fgCritical: '#B3485A',
  fgWarning: '#EDD17B',
  fgWarningShade: '#7A631F',
  fgPromotion: '#D6A55C',

  bgNeutralPrimary: '#0F1115',
  bgNeutralSecondary: '#1A1E23',
  bgNeutralTertiary: '#272C35',
  bgElevation1: '#1A1E23',
  bgElevation2: '#272C35',
  bgInfoSubtle: '#0C1931',
  bgSuccessSubtle: '#0C3119',
  bgWarningSubtle: '#282415',
  bgCriticalSubtle: '#310C13',
  bgPrimarySubtle: '#0D2531',
  bgFeatureFlat: '#0C1931',
  bgShadow: '#0F1115',

  borderMain: '#2F3641',
  borderActive: '#2A7DA7',
  borderCritical: '#D08E99',
  borderInfo: '#99ADD5',
  borderSuccess: '#92D2A8',
  borderWarning: '#EDD17B',

  chartDatapoint1: '#B7C5E1',
  chartDatapoint2: '#6E8BC3',
  chartDatapoint3: '#3C5A94',
  chartDatapoint4: '#0C1931',
  chartBgPlot: '#2F3641',

  teal04: '#6FA7C3',
  blue02: '#152B56',
  blue03: '#3C5A94',
  blue04: '#6E8BC3',
  blue05: '#B7C5E1',
  grey00: '#0F1115',
  grey01: '#1A1E23',
  grey02: '#272C35',
  grey03: '#2F3641',
  grey04: '#5E6D82',
  grey05: '#8F9BAE',
  grey06: '#ECEFF4',

  shadow1: 'drop-shadow(0px 0px 16px rgba(0,0,0,0.64))',
  shadow2: 'drop-shadow(0px 0px 24px rgba(0,0,0,0.64))',
};

// Spacing scale (8px base)
export const SPACING = {
  zero: 0,
  '3xs': 4,
  '2xs': 8,
  xs: 12,
  s: 16,
  m: 24,
  l: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 56,
  '4xl': 64,
  '5xl': 88,
};

// Radius
export const RADIUS = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
};

// Typography helpers
export const TYPE = {
  hxl300: { fontSize: 52, fontWeight: 300, lineHeight: '64px', letterSpacing: -1 },
  hl600: { fontSize: 42, fontWeight: 600, lineHeight: '48px', letterSpacing: -0.5 },
  hm600: { fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: -0.32 },
  hs300: { fontSize: 28, fontWeight: 300, lineHeight: '32px', letterSpacing: -0.32 },
  hs600: { fontSize: 28, fontWeight: 600, lineHeight: '32px', letterSpacing: -0.32 },
  hxs300: { fontSize: 24, fontWeight: 300, lineHeight: '28px', letterSpacing: -0.32 },
  hxs600: { fontSize: 24, fontWeight: 600, lineHeight: '28px', letterSpacing: -0.32 },
  hxxs300: { fontSize: 20, fontWeight: 300, lineHeight: '28px', letterSpacing: -0.32 },
  hxxs600: { fontSize: 20, fontWeight: 600, lineHeight: '28px', letterSpacing: -0.32 },
  pxl400: { fontSize: 18, fontWeight: 400, lineHeight: '24px', letterSpacing: -0.25 },
  pxl600: { fontSize: 18, fontWeight: 600, lineHeight: '24px', letterSpacing: -0.25 },
  pl400: { fontSize: 16, fontWeight: 400, lineHeight: '24px', letterSpacing: -0.25 },
  pl600: { fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: -0.25 },
  pm400: { fontSize: 14, fontWeight: 400, lineHeight: '20px', letterSpacing: 0 },
  pm600: { fontSize: 14, fontWeight: 600, lineHeight: '20px', letterSpacing: 0 },
  ps400: { fontSize: 12, fontWeight: 400, lineHeight: '16px', letterSpacing: 0 },
  ps600: { fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: 0 },
  pxs400: { fontSize: 11, fontWeight: 400, lineHeight: '14px', letterSpacing: 0 },
};
