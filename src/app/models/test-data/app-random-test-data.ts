import { randomTestData, RandomTestData, DEFAULT_LIST_SIZE } from '../../../shared/test-utils/random-test-data';
import { AddressSegment, AddressType, ContactMethod, ContactMethodType, ContactType } from '../model-support/contact-support';
// import { Contact } from '../contact';
// import { ContactService } from '../../services/contact-service';

export class AppRandomTestData extends RandomTestData {
  // public addressSegment(assignedFields?: Partial<AddressSegment>): AddressSegment {
  //   let addressType = randomTestData.pickEnumItem(AddressType);
  //   let otherAddressType = (addressType === AddressType.OTHER) ? randomTestData.text() : undefined;
  //   let country = (randomTestData.coinFlip()) ? randomTestData.text() : undefined as string;
  //   let addressSegment: AddressSegment = {
  //     countryCode: country,
  //     type: addressType,
  //     otherAddressType: otherAddressType,
  //     address1: randomTestData.text(),
  //     address2: randomTestData.text(),
  //     city: randomTestData.text(),
  //     stateProve: randomTestData.text(),
  //     postalCode: randomTestData.text(),
  //     mailingAddress: randomTestData.coinFlip()
  //   };
  //   return {
  //     ...addressSegment,
  //     ...assignedFields
  //   };
  // }

  // public addressList(count: number = DEFAULT_LIST_SIZE): AddressSegment[] {
  //   return randomTestData.itemList(count, () => this.addressSegment());
  // }

  // public addressListBetween(minNumber: number, maxNumber: number): AddressSegment[] {
  //   let createNumberOfItems = randomTestData.pickNumberBetween(minNumber, maxNumber);
  //   return this.addressList(createNumberOfItems);
  // }

  // -----------------------------------------------------------

  public contactMethod(assignedFields?: Partial<ContactMethod>): ContactMethod {
    let contactData: ContactMethod = {
      methodType: randomTestData.pickEnumItem(ContactMethodType),
      contactInfo: randomTestData.text()
    };
    return {
      ...contactData,
      ...assignedFields
    };
  }

  public contactMethodList(count: number = DEFAULT_LIST_SIZE): ContactMethod[] {
    return randomTestData.itemList(count, () => this.contactMethod());
  }

  public contactMethodListBetween(minNumber: number, maxNumber: number): ContactMethod[] {
    let createNumberOfItems = randomTestData.pickNumberBetween(minNumber, maxNumber);
    return this.contactMethodList(createNumberOfItems);
  }

  // -----------------------------------------------------------

  // public contact(assignedFields?: Partial<Contact>): Contact {
  //   let contactData: Contact = {
  //     id: randomTestData.uuid(),
  //     type: randomTestData.pickItem(ContactService.masterContactTypesList()),
  //     name: randomTestData.text(),
  //     addresses: this.addressList(),
  //     contactMethods: this.contactMethodList()
  //   };
  //   return {
  //     ...contactData,
  //     ...assignedFields
  //   };
  // }

  // public contactList(count: number = DEFAULT_LIST_SIZE): Contact[] {
  //   return randomTestData.itemList(count, () => this.contact());
  // }

  // public contactListBetween(minNumber: number, maxNumber: number): Contact[] {
  //   let createNumberOfItems = randomTestData.pickNumberBetween(minNumber, maxNumber);
  //   return this.contactList(createNumberOfItems);
  // }

}

export const appRandomTestData = new AppRandomTestData();
