// import { Contact } from '../contact';
import { Scholarship, CURRENT_SCHOLARSHIP_SCHEMA } from '../scholarship';
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
    status: '',
    schemaVersion: CURRENT_SCHOLARSHIP_SCHEMA
  } as Scholarship;
  return {
    ...scholarship,
    ...assignedFields
  };
}

export function newTask(assignedFields?: Task): Task {
  let task = {
    scholarshipId: '',
    summary: '',
    assignedTo: '',
    notes: undefined,
    done: false,
    schemaVersion: CURRENT_TASK_SCHEMA
  } as Task;
  return {
    ...task,
    ...assignedFields
  };
}
