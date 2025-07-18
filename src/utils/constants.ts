export type BrandId = 'heimAppo' | 'smartPill';

export const BRAND_ID = {
  HEIM_APO: 'heimApo' as BrandId,
  SMART_PILL: 'smartPill' as BrandId,
} as const;

export const BUNDLE_ID = {
  HEIM_APO: 'com.docmorris.heimapo',
  SMART_PILL: 'com.docmorris.smartpill',
} as const;

export const THEME_STORAGE_KEY = 'App_Brand';
