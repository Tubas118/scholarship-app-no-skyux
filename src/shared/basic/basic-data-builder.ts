import { BasicData } from './basic-data';

export interface BasicDataBuilder<ID, T extends BasicData<ID>> {
  id: ID;
  build(): T;
}
