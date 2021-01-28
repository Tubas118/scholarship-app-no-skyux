import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../../models/task';
import { FormGroup, FormControl } from '@angular/forms';
import { newTask } from '../../../models/model-support/app-data-utils';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnChanges {

  @Input()
  public taskDetails: Task;

  @Input()
  public showEditForm: boolean = false;

  @Output()
  public closeEvent: EventEmitter<TaskChangeEvent> = new EventEmitter<TaskChangeEvent>();

  public taskForm: FormGroup;

  private newEntryMode: boolean;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showEditForm) {
      this.taskForm = this.intializeFormGroup(this.taskDetails);
    }
  }

  public onCancel(event: any) {
    this.taskForm.reset();
    this.closeEvent.emit(undefined);
    this.close();
  }

  public onSubmit() {
    this.updateInternalData();

    if (this.newEntryMode) {
      this.addNewEntry();
    } else {
      this.updateExistingEntry();
    }
  }

  public close() {
    this.showEditForm = false;
  }

  private isValid(checkValue: any) {
    return checkValue !== undefined && checkValue !== null;
  }

  private addNewEntry() {
    // if (this.isValid(this.taskDetails.id) && this.taskDetails.id.trim().length === 0) {
    //   this.taskDetails.id = undefined;
    // }
    // this.taskService.add(this.taskDetails).subscribe(result => {
    //   this.closeEvent.emit({ taskChanges: result, newEntry: true });
    //   this.close();
    // });
  }

  private updateExistingEntry() {
    // this.taskService.update(this.taskDetails).subscribe(result => {
    //   this.closeEvent.emit({ taskChanges: result, newEntry: false });
    //   this.close();
    // });
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

  private updateInternalData() {
    this.taskDetails.scholarshipId = this.taskForm.controls['scholarshipId'].value;
    this.taskDetails.summary = this.taskForm.controls['summary'].value;
    this.taskDetails.assignedTo = this.taskForm.controls['assignedTo'].value;
    this.taskDetails.notes = this.taskForm.controls['notes'].value;
    this.taskDetails.done = this.taskForm.controls['done'].value;
    this.taskDetails.invalid = this.taskForm.controls['invalid'].value;
  }
}

export class TaskChangeEvent {
  public taskChanges: Task;
  public newEntry: boolean;
}
