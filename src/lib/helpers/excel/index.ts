import xlsx from 'node-xlsx';
import { TransformParams, OutputFile } from '@/types/index';

const SHEET_OPTIONS = {};

export function build(params: TransformParams): OutputFile {
  const { headers, data: rawData, prefixName = '' } = params;

  const data = [
    Object.values(headers),
    ...rawData.map((item) => Object.keys(headers).map((key) => item?.[key])),
  ];

  const buffer = xlsx.build([
    { name: prefixName, data, options: SHEET_OPTIONS },
  ]);

  return buffer;
}
