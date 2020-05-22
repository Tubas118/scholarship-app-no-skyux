// import { Contact } from '../contact';
import { Scholarship, CURRENT_SCHOLARSHIP_SCHEMA } from '../scholarship';

// export function newContact(assignedFields?: Contact): Contact {
//   let contact = {
//     id: '',
//     name: '',
//     addresses: [],
//     contactMethods: []
//   } as Contact;
//   return {
//     ...contact,
//     ...assignedFields
//   };
// }

export function newScholarship(assignedFields?: Scholarship): Scholarship {
  let scholarship = {
    scholarshipName: '',
    sponsor: '',
    sponsorContactInfo: '',
    contactEmail: '',
    submitDate: new Date(),
    deadlineDate: undefined,
    status: '',
    schemaVersion: CURRENT_SCHOLARSHIP_SCHEMA
  } as Scholarship;
  return {
    ...scholarship,
    ...assignedFields
  };
}
