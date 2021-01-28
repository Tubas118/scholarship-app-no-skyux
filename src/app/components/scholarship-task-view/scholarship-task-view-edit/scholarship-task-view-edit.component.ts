import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ScholarshipTaskView } from '../../../models/views/scholarship-task-view';
import { FormGroup, FormControl } from '@angular/forms';
import { newScholarshipTaskView } from '../../../models/model-support/app-data-utils';
import { ScholarshipService } from 'src/app/services/scholarship-service';
import { TaskService } from 'src/app/services/task-service';
import { CURRENT_TASK_SCHEMA, Task } from 'src/app/models/task';
import { TaskChangeEvent } from '../../task/task-change-event';

@Component({
  selector: 'scholarship-task-view-edit',
  templateUrl: './scholarship-task-view-edit.component.html',
  styleUrls: ['./scholarship-task-view-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScholarshipTaskViewEditComponent implements OnChanges {

  @Input()
  public scholarshipTaskViewDetails: ScholarshipTaskView;

  @Input()
  public showEditForm: boolean = false;

  @Output()
  public closeEvent: EventEmitter<TaskChangeEvent> = new EventEmitter<TaskChangeEvent>();

  public scholarshipTaskViewForm: FormGroup;

  private newEntryMode: boolean;

  constructor(private taskService: TaskService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showEditForm) {
      this.scholarshipTaskViewForm = this.intializeFormGroup(this.scholarshipTaskViewDetails);
    }
  }

  public onCancel(event: any) {
    this.scholarshipTaskViewForm.reset();
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

  private isValidString(checkValue: string) {
    return checkValue !== undefined && checkValue !== null && checkValue.trim().length > 0;
  }

  private isScholarshipTaskViewDetailsValid(scholarshipTaskViewDetails: ScholarshipTaskView) {
    return scholarshipTaskViewDetails !== undefined
      && this.isValidString(scholarshipTaskViewDetails.id)
      && this.isValidString(scholarshipTaskViewDetails.scholarshipId);
  }

  private addNewEntry() {
    if (this.isScholarshipTaskViewDetailsValid(this.scholarshipTaskViewDetails)) {
      this.scholarshipTaskViewDetails.id = undefined;
    }
    let newTask: Task = {
      ...this.scholarshipTaskViewDetails,
      schemaVersion: CURRENT_TASK_SCHEMA
    };
    this.taskService.add(newTask).subscribe(result => {
      this.closeEvent.emit({ taskChanges: result, newEntry: true });
      this.close();
    });
  }

  private updateExistingEntry() {
    let updateTask: Task = {
      ...this.scholarshipTaskViewDetails,
      schemaVersion: CURRENT_TASK_SCHEMA
    };
    this.taskService.update(updateTask).subscribe(result => {
      this.closeEvent.emit({ taskChanges: result, newEntry: false });
      this.close();
    });
  }

  private intializeFormGroup(scholarshipTaskView: ScholarshipTaskView): FormGroup {
    this.newEntryMode = (scholarshipTaskView === undefined);
    this.scholarshipTaskViewDetails = (this.newEntryMode) ? newScholarshipTaskView() : scholarshipTaskView;
    return new FormGroup({
      id: new FormControl(this.scholarshipTaskViewDetails.id),
      scholarshipId: new FormControl(this.scholarshipTaskViewDetails.scholarshipId),
      scholarshipName: new FormControl(this.scholarshipTaskViewDetails.scholarshipName),
      sponsor: new FormControl(this.scholarshipTaskViewDetails.sponsor),
      summary: new FormControl(this.scholarshipTaskViewDetails.summary),
      assignedTo: new FormControl(this.scholarshipTaskViewDetails.assignedTo),
      notes: new FormControl(this.scholarshipTaskViewDetails.notes),
      done: new FormControl(this.scholarshipTaskViewDetails.done),
      invalid: new FormControl(this.scholarshipTaskViewDetails.invalid),
    });
  }

  private updateInternalData() {
      this.scholarshipTaskViewDetails.id = this.scholarshipTaskViewForm.controls['id'].value;
      this.scholarshipTaskViewDetails.scholarshipId = this.scholarshipTaskViewForm.controls['scholarshipId'].value;
      this.scholarshipTaskViewDetails.scholarshipName = this.scholarshipTaskViewForm.controls['scholarshipName'].value;
      this.scholarshipTaskViewDetails.sponsor = this.scholarshipTaskViewForm.controls['sponsor'].value;
      this.scholarshipTaskViewDetails.summary = this.scholarshipTaskViewForm.controls['summary'].value;
      this.scholarshipTaskViewDetails.assignedTo = this.scholarshipTaskViewForm.controls['assignedTo'].value;
      this.scholarshipTaskViewDetails.notes = this.scholarshipTaskViewForm.controls['notes'].value;
      this.scholarshipTaskViewDetails.done = this.scholarshipTaskViewForm.controls['done'].value;
      this.scholarshipTaskViewDetails.invalid = this.scholarshipTaskViewForm.controls['invalid'].value;
  }
}
