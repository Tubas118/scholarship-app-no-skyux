export enum ContactType {
  UNDEFINED = -1,
  PERSON,
  ORG
}

export interface AddressSegment {
  type: AddressType;
  otherAddressType?: string;
  address1: string;
  address2: string;
  city: string;
  stateProve: string;
  postalCode: string;
  countryCode?: string;
  mailingAddress?: boolean;
}

export enum AddressType {
  UNDEFINED = 0,
  HOME,
  WORK,
  SCHOOL,
  OTHER
}

export interface ContactMethod {
  methodType: ContactMethodType;
  contactInfo: string;  // This would depend on 'methodType' - phone => 5125551212, email => john@doe.com
}

export enum ContactMethodType {
  UNDEFINED = 0,
  PHONE,
  CELL,
  EMAIL,
  IN_PERSON
}
