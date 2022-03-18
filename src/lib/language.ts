import { ConfigurationOptions, I18n } from 'i18n';
import { Translate } from '@/types/index';

export function buildI18n(config: ConfigurationOptions): I18n {
  const i18n = new I18n();

  i18n.configure({
    ...config,
    objectNotation: true,
  });

  return i18n;
}

export function createTranslation(
  i18n: I18n,
  locale: string
): Translate {
  return (phrase) => i18n.__({ phrase, locale });
}
