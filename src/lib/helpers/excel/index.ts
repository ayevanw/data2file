import xlsx from 'node-xlsx';
import { BuildParams, OutputFile } from '../../../../types';

const SHEET_OPTIONS = {};

export function build(params: BuildParams): OutputFile {
  const { name, headers, data: rawData } = params;

  const data = [
    Object.values(headers),
    ...rawData.map((item) => Object.keys(headers).map((key) => item?.[key])),
  ];

  const buffer = xlsx.build([{ name, data, options: SHEET_OPTIONS }]);

  return {
    buffer,
    name: `${name}.xlsx`,
  };
}
