import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../models/task';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidateDeactivation } from '../../scholarship/validate-deactivation';
import { deepEqual } from '../../../../lib/utils/equality';
import { TaskSupport } from 'src/app/models/model-support/task-support';

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

  constructor(private taskSupport: TaskSupport) {
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
    if (!this.changesSubmitted) {
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
    return (!this.changesSubmitted && !deepEqual(this.initialTaskDetails, checkTask));
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
    this.taskDetails = (this.newEntryMode) ? this.taskSupport.newModel() : task;
    return new FormGroup({
      scholarshipId: new FormControl(this.taskDetails.scholarshipId),
      summary: new FormControl(this.taskDetails.summary),
      deadlineDate: new FormControl(this.taskDetails.deadlineDate),
      assignedTo: new FormControl(this.taskDetails.assignedTo),
      notes: new FormControl(this.taskDetails.notes),
      done: new FormControl(this.taskDetails.done),
      invalid: new FormControl(this.taskDetails.invalid)
    });
  }

  private updateInternalData(updatedTaskDetails: Task) {
    updatedTaskDetails.scholarshipId = this.taskForm.controls['scholarshipId'].value;
    updatedTaskDetails.summary = this.taskForm.controls['summary'].value;
    updatedTaskDetails.deadlineDate = this.taskForm.controls['deadlineDate'].value;
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
