import { TransformParams, OutputFile } from '../../../../types';

export function build(params: TransformParams): OutputFile {
  const { data: rawData } = params;

  const stringJSON = JSON.stringify(rawData);

  const buffer = Buffer.from(stringJSON, 'utf8');

  return buffer;
}
