import { I18n } from 'i18n';

export type Translate = (phrase: string) => string;

declare function createTranslation(i18n: I18n, locale: string): Translate;
