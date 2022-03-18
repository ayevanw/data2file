import {
  ColumnConfig,
  Config,
  FORMATS,
  MapDataParams,
  MapHeader,
  OutputFile,
  ResultFileBuilder,
  TransformParams,
  Translate,
} from '@/types/index';
import { buildI18n, createTranslation } from './language';
import { get } from './utils';
import { excel, csv, json } from './helpers';

export function mapHeaders<T>(
  columns: ColumnConfig<T>[],
  t: Translate
): MapHeader {
  return columns.reduce((result, item) => {
    const { title, dataIndex } = item;
    return {
      ...result,
      [dataIndex]: t(title),
    };
  }, {});
}

export function mapData<T>(params: MapDataParams<T>) {
  const { rawData, columns, lang, t, i18n } = params;

  return rawData.map((values) => {
    return columns.reduce((result, header) => {
      const { dataIndex, formatter } = header;

      let value = get(values, dataIndex);

      if (typeof formatter === 'function') {
        value = formatter({ value, values, lang, t, i18n });
      }

      return {
        ...result,
        [dataIndex]: value,
      };
    }, {});
  });
}

export function transform(params: TransformParams): OutputFile {
  const { format } = params;

  switch (format) {
    case FORMATS.csv:
      return csv(params);
    case FORMATS.excel:
      return excel(params);
    case FORMATS.json:
    default:
      return json(params);
  }
}

export function createFileBuilder<T>(config: Config<T>): ResultFileBuilder<T> {
  const { columns, prefixName, i18nConfig = {} } = config;

  const i18n = buildI18n(i18nConfig);

  return (rawData, format, lang = 'en') => {
    const t = createTranslation(i18n, lang);

    const headers = mapHeaders<T>(columns, t);

    const data = mapData<T>({ rawData, columns, i18n, lang, t });

    return transform({ headers, data, format, prefixName });
  };
}
