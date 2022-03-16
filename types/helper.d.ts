import { MapData, MapHeader } from './fileBuilder';

export interface BuildParams {
  name: string;
  data: MapData[];
  headers: MapHeader;
}
