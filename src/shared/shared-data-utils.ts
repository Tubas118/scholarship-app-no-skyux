import * as uuid from 'uuid';
import { LoginDetails, USER_CURRENT_SCHEMA } from './models/login-details';

export class RandomData {
  public uuid() {
    return uuid.v4();
  }

  public uuidList(count: number) {
    return this.itemList(count, () => this.uuid());
  }

  public uuidListBetween(minNumber: number, maxNumber: number) {
    return this.itemListBetween(minNumber, maxNumber, () => this.uuid());
  }

  public itemList(count: number, fxn: any) {
    const newList = [];
    for (let index = 0; index < count; index++) {
      newList.push(fxn());
    }
    return newList;
  }

  public itemListBetween(minNumber: number, maxNumber: number, fxn: any) {
    const createNumberOfItems = this.pickNumberBetween(minNumber, maxNumber);
    return this.itemList(createNumberOfItems, fxn);
  }

  public pickItem<T>(items: T[]): T {
    const index = this.pickNumberBetween(0, items.length);
    return items[index];
  }

  public pickEnumItem<T>(enumDef: T): T[keyof T] {
    const enumValues = Object.keys(enumDef)
      .map(n => Number.parseInt(n, 10))
      .filter(n => !Number.isNaN(n) && n >= 0) as unknown as T[keyof T][];
    const index = this.pickNumberBetween(0, enumValues.length);
    return enumValues[index];
  }

  public pickNumberBetween(minNumber: number, maxNumber: number): number {
    if (maxNumber < minNumber) {
      throw new Error('Can\'t have maximum number less than minimum number.');
    }
    return (maxNumber === minNumber) ? maxNumber
      : Math.floor(Math.random() * Math.floor(maxNumber - minNumber)) + minNumber;
  }
}

export const DATE_FORMAT = 'LLL dd, yyyy';

export function copyData<T>(source: T, assignedFields?: Partial<T>): T {
  const copiedData = JSON.parse(JSON.stringify(source));
  return { ...copiedData, ...assignedFields };
}

export function newUser(assignedFields?: Partial<LoginDetails>): LoginDetails {
  const user = {
    id: '',
    provider: '',
    email: '',
    name: '',
    image: '',
    schemaVersion: USER_CURRENT_SCHEMA
  } as LoginDetails;
  return { ...user, ...assignedFields };
}

export const randomData = new RandomData();
