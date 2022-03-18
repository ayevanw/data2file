import _get from 'lodash.get';

export function get(data: unknown, path: string | string[]): any {
  return _get(data, path, '');
}
