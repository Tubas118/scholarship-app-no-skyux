import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskConstants } from 'src/app/models/task-constants';
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

  @Output()
  public bulkTaskChangeEvent: EventEmitter<BulkTaskChangeEvent> = new EventEmitter<BulkTaskChangeEvent>();

  public errorDetail: any;

  public selectedTask: Task;
  public showTaskEditForm: boolean = false;

  protected bulkTaskActionOccurred = false;

  constructor() {
  }

  public ngOnInit(): void {
    console.log(`TaskDashboardComponent => gridData: ${this.gridData?.length || -1}, showTaskEditForm: ${this.showTaskEditForm}`);
  }

  public getBulkTaskActionOccurred() {
    console.trace('getBulkTaskActionOccurred');
    return this.bulkTaskActionOccurred;
  }

  public resetBulkTaskActionOccurred() {
    console.trace('resetBulkTaskActionOccurred');
    this.bulkTaskActionOccurred = false;
    this.bulkTaskChangeEvent.emit({ bulkTaskChangeOccurred: this.bulkTaskActionOccurred });
  }

  protected setBulkTaskActionOccurred() {
    this.bulkTaskActionOccurred = true;
    this.bulkTaskChangeEvent.emit({ bulkTaskChangeOccurred: this.bulkTaskActionOccurred });
  }

  public onNewTask() {
    this.onSelectedTask(undefined);
  }

  public onSelectedTask(selectedTaskId: string) {
    console.log(`TaskDashboardComponent - onSelectedTask: ${selectedTaskId}`);
    if (selectedTaskId === undefined || this.showTaskEditForm === undefined) {
      this.selectedTask = undefined;
      this.showTaskEditForm = true;
    }
    else {
      console.log(`TaskDashboardComponent - onSelectedTask: ${selectedTaskId}`);
      this.selectedTask = this.gridData[selectedTaskId];
      this.showTaskEditForm = true;
    }
  }

  public onCloseEdit(event: TaskChangeEvent) {
    console.log(`onCloseEdit: ${JSON.stringify(event)}`);
    this.showTaskEditForm = false;
    if (event?.newEntry && event?.taskChanges !== undefined) {
        this.gridData.push(event.taskChanges);
    }
    this.ngOnInit();
  }

  public onAddTemplateTasks() {
    this.setBulkTaskActionOccurred();

    console.log(`onAddTemplateTasks - start - ${this.showTaskEditForm}`);
    let needsAppTask = true;
    let needsEssayTask = true;
    let needsFinancialTask = true;

    this.gridData.forEach(task => {
      if (this.isTaskValid(task)) {
        if (task.summary === TaskConstants.APP_SUBMITTED) {
          needsAppTask = false;
        }
        if (task.summary === TaskConstants.ESSAY_SUBMITTED) {
          needsEssayTask = false;
        }
        if (task.summary === TaskConstants.FINANCIALS_SUBMITTED) {
          needsFinancialTask = false;
        }
      }
    });

    if (needsAppTask) {
      this.gridData.push({
        summary: TaskConstants.APP_SUBMITTED
      } as Task);
    }

    if (needsEssayTask) {
      this.gridData.push({
        summary: TaskConstants.ESSAY_SUBMITTED
      } as Task);
    }

    if (needsFinancialTask) {
      this.gridData.push({
        summary: TaskConstants.FINANCIALS_SUBMITTED
      } as Task);
    }
    console.log(`onAddTemplateTasks - end - ${this.showTaskEditForm}`);
  }

  public onInvalidateTasks() {
    this.setBulkTaskActionOccurred();

    console.log(`onInvalidateTasks - start - ${this.showTaskEditForm}`);
    this.gridData.forEach(task => {
      if (this.isTaskValid(task)) {
        task.invalid = true;
      }
    });
    console.log(`onInvalidateTasks - end - ${this.showTaskEditForm}`);
  }

  private isTaskValid(task: Task) {
    return task !== undefined && task.done !== true && task.invalid !== true;
  }
}

export interface BulkTaskChangeEvent {
  bulkTaskChangeOccurred: boolean;
}
