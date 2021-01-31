import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { Task } from '../../../models/task';
import { TaskChangeEvent } from '../task-edit/task-edit.component';

@Component({
  selector: 'task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  @Input()
  public parentForm: FormGroup;

  @Input()
  public gridData: Task[];
  public errorDetail: any;

  public selectedTask: Task;
  public showEditForm: boolean = false;

  constructor() {
  }

  public ngOnInit(): void {
    console.log(`TaskDashboardComponent => gridData: ${this.gridData?.length || -1}`);
  }

  protected static readonly APP_SUBMITTED = 'Application submitted';
  protected static readonly ESSAY_SUBMITTED = 'Essay submitted';
  protected static readonly FINANCIALS_SUBMITTED = 'Financials submitted';

  public onAddTemplateTasks() {
    let needsAppTask = true;
    let needsEssayTask = true;
    let needsFinancialTask = true;

    this.gridData.forEach(task => {
      if (this.isTaskValid(task)) {
        if (task.summary === TaskDashboardComponent.APP_SUBMITTED) {
          needsAppTask = false;
        }
        if (task.summary === TaskDashboardComponent.ESSAY_SUBMITTED) {
          needsEssayTask = false;
        }
        if (task.summary === TaskDashboardComponent.FINANCIALS_SUBMITTED) {
          needsFinancialTask = false;
        }
      }
    });

    if (needsAppTask) {
      this.gridData.push({
        summary: TaskDashboardComponent.APP_SUBMITTED
      } as Task);
    }

    if (needsEssayTask) {
      this.gridData.push({
        summary: TaskDashboardComponent.ESSAY_SUBMITTED
      } as Task);
    }

    if (needsFinancialTask) {
      this.gridData.push({
        summary: TaskDashboardComponent.FINANCIALS_SUBMITTED
      } as Task);
    }
  }

  private isTaskValid(task: Task) {
    return task !== undefined && task.done !== true && task.invalid !== true;
  }

  public onNewTask() {
    this.onSelectedTask(undefined);
  }

  public onSelectedTask(selectedTaskId: string) {
    console.log(`onSelectedTask: ${selectedTaskId}`);
    if (selectedTaskId === undefined || this.showEditForm === undefined) {
      this.selectedTask = undefined;
      this.showEditForm = true;
    }
    else {
      console.log(`onSelectedTask: ${selectedTaskId}`);
      this.selectedTask = this.gridData[selectedTaskId];
      this.showEditForm = true;
    }
  }

  public onCloseEdit(event: TaskChangeEvent) {
    this.showEditForm = false;
    if (event?.newEntry && event?.taskChanges !== undefined) {
        this.gridData.push(event.taskChanges);
    }
    this.ngOnInit();
  }
}
