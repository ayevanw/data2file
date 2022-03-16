import xlsx from 'node-xlsx';
import { BuildParams, OutputFile } from '../../../../types';

const RANGE = { s: { c: 0, r: 0 }, e: { c: 0, r: 3 } }; // A1:A4

const SHEET_OPTIONS = { '!merges': [RANGE] };

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
