import { useTranslation as useTranslationFormI18n } from 'next-i18next';

function useTranslation(moduleName: string) {
  const translation = useTranslationFormI18n(moduleName);
  return {
    t(field: string): string {
      return translation.t(`${field}`);
    }
  }
}

export default useTranslation;
