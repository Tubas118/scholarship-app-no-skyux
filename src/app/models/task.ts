import { BasicData } from 'src/shared/basic/basic-data';

export const CURRENT_TASK_SCHEMA = 10;

export interface Task extends BasicData<string> {
  scholarshipId: string;
  summary: string;
  priority?: number;
  assignedTo: string;
  notes?: Note[];
  done?: boolean;
  invalid?: boolean;
  deadlineDate?: Date;
}

export interface Note {
  details: string;
  timestamp: Date;
  userId: string;
}
