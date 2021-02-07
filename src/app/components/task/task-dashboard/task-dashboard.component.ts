import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskConstants } from 'src/app/models/task-constants';
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
  public activeScholarship: ScholarshipView;

  @Output()
  public bulkTaskChangeEvent: EventEmitter<BulkTaskChangeEvent> = new EventEmitter<BulkTaskChangeEvent>();

  public gridData: Task[];

  public errorDetail: any;

  public selectedTask: Task;
  public showTaskEditForm: boolean = false;

  protected bulkTaskActionOccurred = false;

  constructor() {
  }

  public ngOnInit(): void {
    console.log(`task-dashboard - ngOnInit() - active scholarship: ${this.activeScholarship !== undefined}`);
    this.gridData = (this.activeScholarship !== undefined) ? this.activeScholarship.tasks : undefined;
    console.log(`  gridData = ${this.gridData !== undefined}`);
  }

  public getBulkTaskActionOccurred() {
    return this.bulkTaskActionOccurred;
  }

  public resetBulkTaskActionOccurred() {
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
    if (selectedTaskId === undefined || this.showTaskEditForm === undefined) {
      this.selectedTask = undefined;
      this.showTaskEditForm = true;
    }
    else {
      this.selectedTask = this.gridData[selectedTaskId];
      this.showTaskEditForm = true;
    }
  }

  public onCloseEdit(event: TaskChangeEvent) {
    this.showTaskEditForm = false;
    if (event?.newEntry && event?.taskChanges !== undefined) {
        this.gridData.push(event.taskChanges);
    }
    this.ngOnInit();
  }

  public onAddTemplateTasks() {
    this.setBulkTaskActionOccurred();

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
        deadlineDate: this.activeScholarship?.deadlineDate,
        summary: TaskConstants.APP_SUBMITTED
      } as Task);
    }

    if (needsEssayTask) {
      this.gridData.push({
        deadlineDate: this.activeScholarship?.deadlineDate,
        summary: TaskConstants.ESSAY_SUBMITTED
      } as Task);
    }

    if (needsFinancialTask) {
      this.gridData.push({
        deadlineDate: this.activeScholarship?.deadlineDate,
        summary: TaskConstants.FINANCIALS_SUBMITTED
      } as Task);
    }
  }

  public onInvalidateTasks() {
    this.setBulkTaskActionOccurred();

    this.gridData.forEach(task => {
      if (this.isTaskValid(task)) {
        task.invalid = true;
      }
    });
  }

  private isTaskValid(task: Task) {
    return task !== undefined && task.done !== true && task.invalid !== true;
  }
}

export interface BulkTaskChangeEvent {
  bulkTaskChangeOccurred: boolean;
}
