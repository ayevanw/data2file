import { stringify } from 'csv-stringify/sync';
import { BuildParams, OutputFile } from '../../../../types';

export function build(params: BuildParams): OutputFile {
  const { name, headers, data: rawData } = params;

  const data = [
    Object.values(headers),
    ...rawData.map((item) => Object.keys(headers).map((key) => item?.[key])),
  ];

  const stringCSV = stringify(data);

  const buffer = Buffer.from(stringCSV, 'utf8');

  return {
    buffer,
    name: `${name}.csv`,
  };
}
