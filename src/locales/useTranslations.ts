import i18n from '.';

export const useTranslations = () => {
  const t = (key: string, variables?: Record<string, any>) => i18n.t(key, variables);
  return {
    t,
    i18n,
  };
};
