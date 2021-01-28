import { Note } from '../task';

export interface ScholarshipTaskView {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  sponsor: string;
  summary: string;
  assignedTo: string;
  notes?: Note[];
  done?: boolean;
  invalid?: boolean;
}
