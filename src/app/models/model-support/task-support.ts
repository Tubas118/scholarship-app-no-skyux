import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CURRENT_TASK_SCHEMA, Task } from '../task';
import { ModelSupport } from './all-generic-model-support';

@Injectable({
  providedIn: 'root'
})
export class TaskSupport extends ModelSupport<Task, Task> {
  constructor(protected datepipe: DatePipe) {
    super(datepipe);
  }

  newModel(assignedFields?: Task): Task {
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

  compare(compare1: Task, compare2: Task): number {
    return this.taskSortKey(compare1) > this.taskSortKey(compare2) ? 1 : -1;
  }

  isTaskActive(task: Task) {
    return (task !== undefined && !task?.done && !task?.invalid);
  }

  private taskSortKey(task: Task) {
    let validFlag = (task?.invalid) ? 'X' : 'G';
    let activeFlag = (task?.done) ? 'B' : 'A';
    let deadlineDate = this.getSortDateOrHigh(task?.deadlineDate);
    console.log(`task deadline date: ${deadlineDate}`);
    let priority = (task?.priority !== undefined) ? task?.priority : 3;
    return validFlag + '|' + activeFlag + '|' + deadlineDate + '|' + priority + '|' + task?.summary;
  }

}
