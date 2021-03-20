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

  isValidDate(date: Date) {
    return date !== undefined && date !== null && date.toString().length !== 0;
  }

  alertLevelFromDateString(parmDateString: string): string {
    return this.alertLevelFromDate(this.parseSortDateStringToDate(parmDateString));
  }

  alertLevelFromDate(parmDate: any): string {
    if (parmDate !== undefined) {
      const todayValue = new Date();
      const baseValue = new Date(parmDate.toString());

      if (this.checkDateForAlert(todayValue, baseValue, 0)) {
        return 'red';
      }

      if (this.checkDateForAlert(todayValue, baseValue, -7)) {
        return 'orange';
      }

      if (this.checkDateForAlert(todayValue, baseValue, -23)) {
        return 'yellow';
      }
    }

    return 'green';
  }

  private checkDateForAlert(todayValue: Date, baseValue: Date, dayOffset: number) {
    let checkValue = new Date(baseValue.toDateString());
    checkValue.setDate(baseValue.getDate() + dayOffset);
    return todayValue >= checkValue;
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
    return result;
  }

  activeDeadlineDate(scholarship: Scholarship): Date {
    let deadlineDate: Date = scholarship.deadlineDate || undefined;
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
