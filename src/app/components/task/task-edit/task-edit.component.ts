import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../models/task';
import { FormGroup, FormControl } from '@angular/forms';
import { newTask } from '../../../models/model-support/app-data-utils';
import { ValidateDeactivation } from '../../scholarship/validate-deactivation';
import { deepEqual } from '../../../../lib/utils/equality';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent extends ValidateDeactivation implements OnChanges {
  @Input()
  public taskDetails: Task;

  @Input()
  public showTaskEditForm: boolean = false;

  @Output()
  public closeTaskEditEvent: EventEmitter<TaskChangeEvent> = new EventEmitter<TaskChangeEvent>();

  public taskForm: FormGroup;

  private initialTaskDetails: Task;
  private validateTaskDetails: Task;
  private changesSubmitted = false;
  private newEntryMode: boolean;

  constructor() {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showTaskEditForm) {
      this.initialTaskDetails = {
        ...this.taskDetails
      };
      this.taskForm = this.intializeFormGroup(this.taskDetails);
    }
  }

  public get debugId(): string {
    return 'TaskEditComponent';
  }

  public get doNotClose(): boolean {
    return true;
  }

  public get validateForDeactivation(): boolean {
    console.log('TaskEditComponent closing...');
    if (!this.changesSubmitted) {
      console.log('Closing but data not submitted');
      this.validateTaskDetails = {
        ...this.initialTaskDetails
      } as Task;
      this.updateInternalData(this.validateTaskDetails);
      const checkTask: Task = (this.validateTaskDetails !== undefined) ? this.validateTaskDetails : this.taskDetails;
      return this.isDirtyWorker(checkTask);
    }

    return false;
  }

  protected isDirtyWorker(checkTask: Task): boolean {
    console.log(`changesSubmitted=${this.changesSubmitted}`);
    console.log(`checkTask: ${JSON.stringify(checkTask)}`);
    console.log(`initView:  ${JSON.stringify(this.initialTaskDetails)}`);
    let isDirtyResult = (!this.changesSubmitted && !deepEqual(this.initialTaskDetails, checkTask));
    console.log(`ScholarshipEditComponent - isDirty=${isDirtyResult}`);
    return isDirtyResult;
  }

  public onCancel(event: any) {
    this.taskForm.reset();
    this.closeTaskEditEvent.emit(undefined);
    this.close();
  }

  public onSubmit() {
    this.updateInternalData(this.taskDetails);
    this.changesSubmitted = true;

    if (this.newEntryMode) {
      this.addNewEntry();
    } else {
      this.updateExistingEntry();
    }
  }

  public close() {
    this.showTaskEditForm = false;
  }

  private isValid(checkValue: any) {
    return checkValue !== undefined && checkValue !== null;
  }

  private addNewEntry() {
    if (this.isValid(this.taskDetails.id) && this.taskDetails.id.trim().length === 0) {
      this.taskDetails.id = undefined;
    }
    this.closeTaskEditEvent.emit({ taskChanges: this.taskDetails, newEntry: true });
    this.close();
  }

  private updateExistingEntry() {
    this.closeTaskEditEvent.emit({ taskChanges: this.taskDetails, newEntry: false });
    this.close();
  }

  private intializeFormGroup(task: Task): FormGroup {
    this.newEntryMode = (task === undefined);
    this.taskDetails = (this.newEntryMode) ? newTask() : task;
    return new FormGroup({
      scholarshipId: new FormControl(this.taskDetails.scholarshipId),
      summary: new FormControl(this.taskDetails.summary),
      assignedTo: new FormControl(this.taskDetails.assignedTo),
      notes: new FormControl(this.taskDetails.notes),
      done: new FormControl(this.taskDetails.done),
      invalid: new FormControl(this.taskDetails.invalid)
    });
  }

  private updateInternalData(updatedTaskDetails: Task) {
    updatedTaskDetails.scholarshipId = this.taskForm.controls['scholarshipId'].value;
    updatedTaskDetails.summary = this.taskForm.controls['summary'].value;
    updatedTaskDetails.assignedTo = this.taskForm.controls['assignedTo'].value;
    updatedTaskDetails.notes = this.taskForm.controls['notes'].value;
    updatedTaskDetails.done = this.taskForm.controls['done'].value;
    updatedTaskDetails.invalid = this.taskForm.controls['invalid'].value;
  }
}

export class TaskChangeEvent {
  public taskChanges: Task;
  public newEntry: boolean;
}
