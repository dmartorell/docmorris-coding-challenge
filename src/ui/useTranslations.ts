import i18n from '../locales';

export const useTranslations = () => {
  const t = (value: string) => i18n.t(value);

  return {
    t,
    i18n,
  };
};
