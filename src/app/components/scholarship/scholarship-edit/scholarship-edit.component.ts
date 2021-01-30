import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Scholarship } from '../../../models/scholarship';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ScholarshipService } from '../../../services/scholarship-service';
import { newScholarship } from '../../../models/model-support/app-data-utils';
import { TranslateService } from '@ngx-translate/core';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { Task } from 'src/app/models/task';
import { TaskChangeEvent } from '../../task/task-edit/task-edit.component';

@Component({
  selector: 'scholarship-edit',
  templateUrl: './scholarship-edit.component.html',
  styleUrls: ['./scholarship-edit.component.scss']
})
export class ScholarshipEditComponent implements OnInit, OnChanges {

  @Input()
  public scholarshipDetails: ScholarshipView;

  @Input()
  public showScholarshipEditForm: boolean = false;

  public selectedTask: Task;
  public showTaskEditForm: boolean = false;

  @Output()
  public closeEvent: EventEmitter<ScholarshipChangeEvent> = new EventEmitter<ScholarshipChangeEvent>();

  @Output()
  public tasksEvent: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  public scholarshipForm: FormGroup;

  private selectedStatus: string;
  private newEntryMode: boolean;

  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder,
              private scholarshipService: ScholarshipService) {
  }

  public ngOnInit(): void {
    console.log(`emit tasks: ${JSON.stringify(this.scholarshipDetails?.tasks)}`);
    this.tasksEvent.emit(this.scholarshipDetails?.tasks);
  }

  public get scholarshipStatusList(): string[] {
    const statusList = ScholarshipService.masterScholarshipStatusList();
    return ['ALL'].concat(statusList);
  }

  public get activeScholarshipTasks(): Task[] {
    console.log(`activeScholarshipTasks`);
    return this.scholarshipDetails !== undefined
      ? this.scholarshipDetails.tasks : [];
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showScholarshipEditForm) {
      this.scholarshipForm = this.intializeFormGroup(this.scholarshipDetails);
      this.selectedStatus = this.scholarshipDetails.status;
    }
  }

  public onSelectedItemChanged(entry: any) {
    if (entry.target.value) {
      const parsed: string[] = entry.target.value.split(' ', 2);
      console.log(`parsed: ${parsed}`);
      this.selectedStatus = parsed[1];
    }
  }

  public onCancel(event: any) {
    this.scholarshipForm.reset();
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
    this.showScholarshipEditForm = false;
  }

  public get isEmailInvalid(): boolean {
    let contactEmailControl = this.scholarshipForm.controls['contactEmail'];
    return contactEmailControl.errors
      && contactEmailControl.errors.skyEmail
      && contactEmailControl.dirty
      && contactEmailControl.touched;
  }

  // public onNewTask() {
  //   this.onSelectedTask(undefined);
  // }

  // public onSelectedTask(selectedTaskId: string) {
  //   console.log(`onSelectedTask: ${selectedTaskId}`);
  //   if (selectedTaskId === undefined || this.scholarshipDetails === undefined) {
  //     this.selectedTask = undefined;
  //     this.showTaskEditForm = true;
  //   }
  //   else {
  //     console.log(`onSelectedTask: ${selectedTaskId}`);
  //     this.scholarshipDetails.tasks.forEach(task => {
  //       if (task.id === selectedTaskId) {
  //         this.selectedTask = task;
  //         this.showTaskEditForm = true;
  //       }
  //     });
  //   }
  // }

  // public onCloseTaskEdit(event: TaskChangeEvent) {
  //   this.showTaskEditForm = false;
  //   if (event !== undefined) {
  //     this.ngOnInit();
  //   }
  // }

  private isValid(checkValue: any) {
    return checkValue !== undefined && checkValue !== null;
  }

  private addNewEntry() {
    if (this.isValid(this.scholarshipDetails.id) && this.scholarshipDetails.id.trim().length === 0) {
      this.scholarshipDetails.id = undefined;
      this.scholarshipDetails.submitDate = new Date();
    }
    this.scholarshipService.add(this.scholarshipDetails).subscribe(result => {
      this.closeEvent.emit({ scholarshipChanges: result, newEntry: true });
      this.close();
    });
  }

  private updateExistingEntry() {
    this.scholarshipService.update(this.scholarshipDetails).subscribe(result => {
      this.closeEvent.emit({ scholarshipChanges: result, newEntry: false });
      this.close();
    });
  }

  private selectScholarshipView(scholarship: ScholarshipView): ScholarshipView {
    console.log(`selecting scholarship: new? ${this.newEntryMode}, parm=${scholarship?.scholarshipName || 'n/a'}`);
    if (this.newEntryMode) {
      return {
        ...newScholarship()
      } as ScholarshipView;
    }
    return scholarship;
  }

  private intializeFormGroup(scholarship: ScholarshipView): FormGroup {
    this.newEntryMode = (scholarship === undefined);
    this.scholarshipDetails = this.selectScholarshipView(scholarship);
    return this.formBuilder.group({
      scholarshipName: new FormControl(this.scholarshipDetails.scholarshipName),
      scholarshipCode: new FormControl(this.scholarshipDetails.code),
      targetAmount: new FormControl(this.scholarshipDetails.targetAmount),
      //sponsor: new FormControl(this.scholarshipDetails.sponsor),
      sponsorId: new FormControl(this.scholarshipDetails.sponsorId),
      contactInfo: new FormControl(this.scholarshipDetails.contactInfo),
      contactPhone: new FormControl(this.scholarshipDetails.contactPhone),
      contactEmail: new FormControl(this.scholarshipDetails.contactEmail  /* , SkyValidators.email */),
      minimumGpa: new FormControl(this.scholarshipDetails.minimumGpa),
      submitDate: new FormControl(this.scholarshipDetails.submitDate),
      deadlineDate: new FormControl(this.scholarshipDetails.deadlineDate),
      status: new FormControl(this.scholarshipDetails.status),
      submitted: new FormControl(this.scholarshipDetails.submitted || false),
      previouslyApplied: new FormControl(this.scholarshipDetails.previouslyApplied || false),
      previouslyAwarded: new FormControl(this.scholarshipDetails.previouslyAwarded || false),
      membershipRequired: new FormControl(this.scholarshipDetails.membershipRequired || false)
      //tasks: new FormControl(this.scholarshipDetails.tasks),

      // essayRequired: new FormControl(this.scholarshipDetails.essayRequired || false),
      // essaySubmitted: new FormControl(this.scholarshipDetails.essaySubmitted || false),
      // financialsRequired: new FormControl(this.scholarshipDetails.financialsRequired || false),
      // financialsSubmitted: new FormControl(this.scholarshipDetails.financialsSubmitted || false)
    });
  }

  private updateInternalData() {
    this.scholarshipDetails.scholarshipName = this.scholarshipForm.controls['scholarshipName'].value;
    this.scholarshipDetails.code = this.scholarshipForm.controls['scholarshipCode'].value;
    this.scholarshipDetails.targetAmount = Number(this.scholarshipForm.controls['targetAmount'].value);
    // this.scholarshipDetails.sponsor = this.scholarshipForm.controls['sponsor'].value;
    this.scholarshipDetails.sponsorId = this.scholarshipForm.controls['sponsorId'].value;
    this.scholarshipDetails.contactInfo = this.scholarshipForm.controls['contactInfo'].value;
    this.scholarshipDetails.contactPhone = this.scholarshipForm.controls['contactPhone'].value;
    this.scholarshipDetails.contactEmail = this.scholarshipForm.controls['contactEmail'].value;
    this.scholarshipDetails.minimumGpa = this.scholarshipForm.controls['minimumGpa'].value;
    this.scholarshipDetails.submitDate = this.scholarshipForm.controls['submitDate'].value;
    this.scholarshipDetails.deadlineDate = this.scholarshipForm.controls['deadlineDate'].value;
    this.scholarshipDetails.status = this.selectedStatus;
    this.scholarshipDetails.submitted = this.scholarshipForm.controls['submitted'].value;
    this.scholarshipDetails.previouslyApplied = this.scholarshipForm.controls['previouslyApplied'].value;
    this.scholarshipDetails.previouslyAwarded = this.scholarshipForm.controls['previouslyAwarded'].value;
    this.scholarshipDetails.membershipRequired = this.scholarshipForm.controls['membershipRequired'].value;
    //this.scholarshipDetails.tasks = this.scholarshipForm.controls['tasks'].value;

    // this.scholarshipDetails.essayRequired = this.scholarshipForm.controls['essayRequired'].value;
    // this.scholarshipDetails.essaySubmitted = this.scholarshipForm.controls['essaySubmitted'].value;
    // this.scholarshipDetails.financialsRequired = this.scholarshipForm.controls['financialsRequired'].value;
    // this.scholarshipDetails.financialsSubmitted = this.scholarshipForm.controls['financialsSubmitted'].value;
  }
}

export class ScholarshipChangeEvent {
  public scholarshipChanges: Scholarship;
  public newEntry: boolean;
}
