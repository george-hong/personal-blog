import { useTranslation } from 'next-i18next';
import { TranslationModule } from './translation.interface';

class Translation {
  private translation;

  constructor(translationModule: TranslationModule) {
    this.translation = useTranslation(translationModule);
  }

  getModule(moduleName: string) {
    return (field: string) => {
      return this.translation.t(`${moduleName}:${field}`);
    }
  }
}

export default Translation;