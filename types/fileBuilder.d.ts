import { ConfigurationOptions, I18n } from 'i18n';
import { Translate } from './language';

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

export type MapHeader = {
  [key: string]: string;
};

export type MapData = {
  [key: string]: string;
};

export interface MapDataParams<T> {
  rawData: T[];
  columns: ColumnConfig<T>[];
  lang: string;
  t: Translate;
  i18n: I18n;
}

export interface Config<T> {
  prefixName: string;
  columns: ColumnConfig<T>[];
  i18nConfig?: ConfigurationOptions;
}

export interface OutputFile {
  name: string;
  buffer: Buffer;
}

export interface TransformParams {
  format?: string;
  name: string;
  data: MapData[];
  headers: MapHeader;
}

export type ResultFileBuilder<T> = (
  rawData: T[],
  format: string,
  lang?: string
) => OutputFile;

export function mapHeaders<T>(
  columns: ColumnConfig<T>[],
  t: Translate
): MapHeader;

export function mapData<T>(params: MapDataParams<T>): any;

export function transform(params: TransformParams): OutputFile;

export function createFileBuilder<T>(config: Config<T>): ResultFileBuilder<T>;
