import { BasicData } from 'src/shared/basic/basic-data';

export const CURRENT_TASK_SCHEMA = 1;

export interface Task extends BasicData<string> {
  scholarshipId: string;
  summary: string;
  assignedTo: string;
  notes?: Note[];
  done?: boolean;
  invalid?: boolean;
}

export interface Note {
  details: string;
  timestamp: Date;
  userId: string;
}
