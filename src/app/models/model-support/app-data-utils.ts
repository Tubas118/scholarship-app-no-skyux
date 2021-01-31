// import { Contact } from '../contact';
import { Scholarship, CURRENT_SCHOLARSHIP_SCHEMA } from '../scholarship';
import { CURRENT_SPONSOR_SCHEMA, Sponsor } from '../sponsor';
import { CURRENT_TASK_SCHEMA, Task } from '../task';

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
    // status: '', -- Deprecated in schema 11
    tasks: [],
    schemaVersion: CURRENT_SCHOLARSHIP_SCHEMA
  } as Scholarship;
  return {
    ...scholarship,
    ...assignedFields
  };
}

export function newSponsor(assignedFields?: Sponsor): Sponsor {
  let sponsor = {
    sponsor: '',
    contactInfo: '',
    contactPhone: '',
    contactEmail: '',
    schemaVersion: CURRENT_SPONSOR_SCHEMA
  } as Sponsor;
  return {
    ...sponsor,
    ...assignedFields
  };
}

export function newTask(assignedFields?: Task): Task {
  let task = {
    scholarshipId: '',
    summary: '',
    assignedTo: '',
    notes: [],
    done: false,
    schemaVersion: CURRENT_TASK_SCHEMA
  } as Task;
  return {
    ...task,
    ...assignedFields
  };
}
