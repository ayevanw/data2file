import { ConfigurationOptions, I18n } from 'i18n';

export enum FORMATS {
  excel = 'EXCEL',
  csv = 'CSV',
  json = 'JSON',
  pdf = 'PDF', //comming soon
}

export type Translate = (phrase: string) => string;

export interface FormatterParams<T, V extends any = any> {
  value?: V;
  values: T;
  lang: string;
  i18n: I18n;
  t: Translate;
}

export type FormatterCb<T> = (params: FormatterParams<T>) => string;

export interface ColumnConfig<T> {
  dataIndex: string;
  title: string;
  formatter?: FormatterCb<T>;
}

export interface ObjectType<T extends any> {
  [key: string]: T;
}

export interface StringMap {
  [key: string]: string;
}

export type MapHeader = StringMap;

export type MapData = StringMap;

export interface MapDataParams<T> {
  rawData: T[];
  columns: ColumnConfig<T>[];
  lang: string;
  t: Translate;
  i18n: I18n;
}

export interface Config<T> {
  prefixName?: string;
  columns: ColumnConfig<T>[];
  i18nConfig?: ConfigurationOptions;
}

export type OutputFile = Buffer;

export interface TransformParams {
  format?: string;
  data: MapData[];
  headers: MapHeader;
  prefixName?: string;
}

export type ResultFileBuilder<T> = (
  rawData: T[],
  format: FORMATS,
  lang?: string
) => OutputFile;
