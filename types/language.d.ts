import { I18n } from 'i18n';

export type Translate = (phrase: string) => string;

export function createTranslation(i18n: I18n, locale: string): Translate;
