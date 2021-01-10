import { Task } from 'src/app/models/task';

export class TaskChangeEvent {
  public taskChanges: Task;
  public newEntry: boolean;
}
