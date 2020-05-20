// import { Contact } from '../contact';
import { Scholarship } from '../scholarship';

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
    status: ''
  } as Scholarship;
  return {
    ...scholarship,
    ...assignedFields
  };
}
