import i18n from '../locales';

export const formatCurrency = (value: number): string => {
  const currentLocale = i18n.language;
  const currencyCode = 'EUR';
  return new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
