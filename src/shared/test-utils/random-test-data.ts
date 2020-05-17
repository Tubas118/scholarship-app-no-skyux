import { RandomData } from '../shared-data-utils';
import { LoginDetails } from '../models/login-details';
// import { SocialUser } from 'angular-6-social-login-v2';

export const DEFAULT_LIST_SIZE = 5;
export const DEFAULT_STRING_LENGTH = 7;

export class RandomTestData extends RandomData {
  public text(length: number = DEFAULT_STRING_LENGTH) {
    // Derived from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let randomString = '';
    while (randomString.length < length) {
      randomString = Math.random().toString(36).replace(/[^A-Za-z]+/g, '');
    }
    return randomString.substring(0, length);
  }

  public textList(count: number, length: number = DEFAULT_STRING_LENGTH) {
    return this.itemList(count, () => this.text(length) );
  }

  public textListBetween(minNumber: number, maxNumber: number, length: number = DEFAULT_STRING_LENGTH) {
    const createNumberOfItems = this.pickNumberBetween(minNumber, maxNumber);
    return this.textList(createNumberOfItems, length);
  }

  public coinFlip(): boolean {
    return this.pickNumberBetween(1,  2) === 1;
  }

  public date(): Date {
    const date = new Date();
    const daysOffset = this.pickNumberBetween(0, 730) - 365;
    date.setDate(date.getDate() + daysOffset);
    return date;
  }

  public email(): string {
    return `${this.text()}@${this.text()}.com`;
  }

  // // -----------------------------------------------------------

  // public socialUser(assignedFields?: Partial<SocialUser>): SocialUser {
  //   const randomUser = {
  //     provider: randomTestData.text(),
  //     id: randomTestData.uuid(),
  //     email: randomTestData.email(),
  //     name: randomTestData.text(),
  //     image: randomTestData.text(),
  //     token: randomTestData.coinFlip ? randomTestData.text() : undefined,
  //     idToken: randomTestData.coinFlip ? randomTestData.text() : undefined
  //   } as SocialUser;
  //   return {
  //     ...randomUser,
  //     ...assignedFields
  //   };
  // }

  // -----------------------------------------------------------

  public user(assignedFields?: Partial<LoginDetails>): LoginDetails {
    const user: LoginDetails = {
      id: randomTestData.uuid(),
      provider: randomTestData.text(),
      email: randomTestData.email(),
      name: randomTestData.text(),
      image: randomTestData.text()
    };
    return { ...user, ...assignedFields };
  }

  public userList(count: number = DEFAULT_LIST_SIZE): LoginDetails[] {
    return randomTestData.itemList(count, () => this.user());
  }

  public userListBetween(minNumber: number, maxNumber: number): LoginDetails[] {
    const createNumberOfItems = randomTestData.pickNumberBetween(minNumber, maxNumber);
    return this.userList(createNumberOfItems);
  }
}

export const randomTestData = new RandomTestData();
