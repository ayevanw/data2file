import { stringify } from 'csv-stringify/sync';
import { TransformParams, OutputFile } from '@/types/index';

export function build(params: TransformParams): OutputFile {
  const { headers, data: rawData } = params;

  const data = [
    Object.values(headers),
    ...rawData.map((item) => Object.keys(headers).map((key) => item?.[key])),
  ];

  const stringCSV = stringify(data);

  const buffer = Buffer.from(stringCSV, 'utf8');

  return buffer;
}
