import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Scholarship, CURRENT_SCHOLARSHIP_SCHEMA } from '../scholarship';
import { ScholarshipView } from '../views/scholarship-view';
import { ModelSupport } from './all-generic-model-support';
import { TaskSupport } from './task-support';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipSupport extends ModelSupport<Scholarship, ScholarshipView> {
  constructor(protected datepipe: DatePipe,
              protected taskSupport: TaskSupport) {
    super(datepipe);
  }

  newModel(assignedFields?: Scholarship): Scholarship {
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

  compare(compare1: ScholarshipView, compare2: ScholarshipView): number {
    const sortKey1 = this.scholarshipSortKey(compare1);
    const sortKey2 = this.scholarshipSortKey(compare2);
    const result = sortKey1 > sortKey2 ? 1 : -1;
    console.log(`compare: ${result}`);
    console.log(`  ${sortKey1} - ${compare1.deadlineDate}`);
    console.log(`  ${sortKey2} - ${compare2.deadlineDate}`);
    console.log('');
    return result;
  }

  activeDeadlineDate(scholarship: Scholarship) {
    let deadlineDate = scholarship.deadlineDate || undefined;
    if (scholarship?.tasks !== undefined) {
      scholarship.tasks.forEach(task => {
        if (this.taskSupport.isTaskActive(task) && task?.deadlineDate !== undefined) {
          if (deadlineDate === undefined || task?.deadlineDate < deadlineDate) {
            deadlineDate = task.deadlineDate;
          }
        }
      });
    }
    return deadlineDate;
  }

  activeSortDeadlineDate(scholarship: Scholarship) {
    return this.getSortDateOrHigh(this.activeDeadlineDate(scholarship));
  }

  private scholarshipSortKey(scholarshipView: ScholarshipView) {
    let priority = this.activeScholarshipPriority(scholarshipView);
    let openTaskFlag = (scholarshipView?.openTasks?.length > 0) ? 'A' : 'B';
    let openTaskSortValue = scholarshipView?.openTasks?.length || 0;
    const sortKey = openTaskFlag + '|' + this.activeSortDeadlineDate(scholarshipView)
      + '|' + priority + '|' + openTaskSortValue.toString().padStart(5, '0')
      + '|' + scholarshipView.scholarshipName;

    return sortKey;
  }

  private activeScholarshipPriority(scholarshipView: ScholarshipView) {
    let priority = scholarshipView?.priority | 3;
    if (scholarshipView?.openTasks !== undefined && scholarshipView?.openTasks.length > 0) {
      scholarshipView.openTasks.forEach(task => {
        let taskPriority = task?.priority || 3;
        if (priority > taskPriority) {
          priority = taskPriority;
        }
      });
    }
    return priority;
  }
}
