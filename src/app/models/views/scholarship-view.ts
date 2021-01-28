import { Scholarship } from '../scholarship';
import { Task } from '../task';

export interface ScholarshipView extends Scholarship {
  openTasks: Task[];
}
