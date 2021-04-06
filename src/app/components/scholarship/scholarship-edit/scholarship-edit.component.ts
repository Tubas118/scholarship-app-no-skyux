import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Scholarship } from '../../../models/scholarship';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ScholarshipService } from '../../../services/scholarship-service';
import { TranslateService } from '@ngx-translate/core';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { Task } from 'src/app/models/task';
import { SponsorService } from 'src/app/services/sponsor-service';
import { SelectedItem } from 'src/lib/components/selectbox/selectbox.component';
import { Observable } from 'rxjs';
import { ValidateDeactivation } from '../validate-deactivation';
import { deepEqual } from '../../../../lib/utils/equality';
import { BulkTaskChangeEvent, TaskDashboardComponent } from '../../task/task-dashboard/task-dashboard.component';
import { ScholarshipSupport } from 'src/app/models/model-support/scholarship-support';

@Component({
  selector: 'scholarship-edit',
  templateUrl: './scholarship-edit.component.html',
  styleUrls: ['./scholarship-edit.component.scss']
})
export class ScholarshipEditComponent extends ValidateDeactivation implements OnInit, OnChanges {
  @Input()
  public scholarshipDetails: ScholarshipView;

  @Input()
  public showScholarshipEditForm: boolean = false;

  public selectedTask: Task;
  public showTaskEditForm: boolean = false;

  // Should always be true - provided for unit testing.
  public showTaskDashboard = true;

  @Output()
  public closeEvent: EventEmitter<ScholarshipChangeEvent> = new EventEmitter<ScholarshipChangeEvent>();

  @Output()
  public tasksEvent: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  @ViewChild(TaskDashboardComponent) taskDashboard: TaskDashboardComponent;

  public scholarshipForm: FormGroup;

  private initialScholarshipDetails: ScholarshipView;
  private validateScholarshipDetails: ScholarshipView;

  private newEntryMode: boolean;
  private changesSubmitted = false;

  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder,
              private scholarshipService: ScholarshipService,
              private scholarshipSupport: ScholarshipSupport) {
    super();
  }

  public ngOnInit(): void {
    this.ngOnChanges(undefined);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showScholarshipEditForm) {
      this.tasksEvent.emit(this.scholarshipDetails?.tasks);

      this.scholarshipForm = this.initializeFormGroup(this.scholarshipDetails);
      // Deprecated in schema 11 -- this.selectedStatus = this.scholarshipDetails.status;
    }
  }

  public get sponsorSelectList(): Observable<SelectedItem[]> {
    return this.scholarshipService.getSponsorSelectList();
  }

  /** @deprecated */
  public get scholarshipStatusList(): string[] {
    const statusList = ScholarshipService.masterScholarshipStatusList();
    return ['ALL'].concat(statusList);
  }

  public get debugId(): string {
    return 'ScholarshipEditComponent';
  }

  public get doNotClose(): boolean {
    return true;
  }

  public get validateForDeactivation(): boolean {
    if (!this.changesSubmitted) {
      this.validateScholarshipDetails = {
        ...this.initialScholarshipDetails
      } as ScholarshipView;
      this.updateInternalData(this.validateScholarshipDetails);
      const checkView: ScholarshipView = (this.validateScholarshipDetails !== undefined) ? this.validateScholarshipDetails : this.scholarshipDetails;
      return this.isDirtyWorker(checkView);
    }

    return false;
  }

  protected bulkTaskActionOccurred: boolean;

  public getBulkTaskActionOccurred() {
    return this.taskDashboard?.getBulkTaskActionOccurred() || this.bulkTaskActionOccurred;
  }

  public resetBulkTaskActionOccurred() {
    this.taskDashboard?.resetBulkTaskActionOccurred();
    this.bulkTaskActionOccurred = false;
  }

  public onBulkTaskChangeEvent(event: BulkTaskChangeEvent) {
    this.bulkTaskActionOccurred = event.bulkTaskChangeOccurred;
  }

  public onCancel(event: any) {
    this.scholarshipForm.reset();
    this.closeEvent.emit(undefined);
    this.close();
  }

  public onScholarshipSubmit() {
    this.updateInternalData(this.scholarshipDetails);
    this.changesSubmitted = true;

    if (this.newEntryMode) {
      this.addNewEntry();
    } else {
      this.updateExistingEntry();
    }
  }

  public close() {
    if (this.taskDashboard !== undefined) {
      this.taskDashboard.gridData = undefined;
    }
    if (this.isOkayToClose()) {
      this.showScholarshipEditForm = false;
    }
  }

  protected isDirtyWorker(checkScholarshipDetails: ScholarshipView): boolean {
    let isDirtyResult = (!this.changesSubmitted && !this.getBulkTaskActionOccurred() && !deepEqual(this.initialScholarshipDetails, checkScholarshipDetails));
    return isDirtyResult;
  }

  public get isEmailInvalid(): boolean {
    let contactEmailControl = this.scholarshipForm.controls['contactEmail'];
    return contactEmailControl.errors
      && contactEmailControl.errors.skyEmail
      && contactEmailControl.dirty
      && contactEmailControl.touched;
  }

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
    if (this.newEntryMode) {
      return {
        ...this.scholarshipSupport.newModel()
      } as ScholarshipView;
    }
    return scholarship;
  }

  public blankFormGroup(): FormGroup {
    return this.initializeFormGroup(undefined);
  }

  public initializeFormGroup(scholarship: ScholarshipView): FormGroup {
    this.newEntryMode = (scholarship === undefined);
    this.scholarshipDetails = this.selectScholarshipView(scholarship);
    this.initialScholarshipDetails = {
      ...this.scholarshipDetails
    };

    let fg = this.formBuilder.group({
      scholarshipName: new FormControl(this.scholarshipDetails.scholarshipName),
      scholarshipCode: new FormControl(this.scholarshipDetails.code),
      targetAmount: new FormControl(this.scholarshipDetails.targetAmount),
      sponsorId: new FormControl(this.scholarshipDetails.sponsorId),
      contactInfo: new FormControl(this.scholarshipDetails.contactInfo),
      contactPhone: new FormControl(this.scholarshipDetails.contactPhone),
      contactEmail: new FormControl(this.scholarshipDetails.contactEmail  /* , SkyValidators.email */),
      minimumGpa: new FormControl(this.scholarshipDetails.minimumGpa),
      submitDate: new FormControl(this.scholarshipDetails.submitDate),
      deadlineDate: new FormControl(this.scholarshipDetails.deadlineDate),
      // Deprecated in schema 11 -- status: new FormControl(this.scholarshipDetails.status),
      submitted: new FormControl(this.scholarshipDetails.submitted || false),
      previouslyApplied: new FormControl(this.scholarshipDetails.previouslyApplied || false),
      previouslyAwarded: new FormControl(this.scholarshipDetails.previouslyAwarded || false),
      membershipRequired: new FormControl(this.scholarshipDetails.membershipRequired || false),
      webpage: new FormControl(this.scholarshipDetails.webpage)
    });

    return fg;
  }

  private updateInternalData(updatedScholarship: ScholarshipView) {
    updatedScholarship.scholarshipName = this.scholarshipForm.controls['scholarshipName'].value;
    updatedScholarship.code = this.scholarshipForm.controls['scholarshipCode'].value;
    updatedScholarship.targetAmount = Number(this.scholarshipForm.controls['targetAmount'].value);
    updatedScholarship.sponsorId = this.scholarshipForm.controls['sponsorId'].value;
    updatedScholarship.contactInfo = this.scholarshipForm.controls['contactInfo'].value;
    updatedScholarship.contactPhone = this.scholarshipForm.controls['contactPhone'].value;
    updatedScholarship.contactEmail = this.scholarshipForm.controls['contactEmail'].value;
    updatedScholarship.minimumGpa = this.scholarshipForm.controls['minimumGpa'].value;
    updatedScholarship.submitDate = this.scholarshipForm.controls['submitDate'].value;
    updatedScholarship.deadlineDate = this.scholarshipForm.controls['deadlineDate'].value;
    // Deprecated in schema 11 -- updatedScholarship.status = this.selectedStatus;
    updatedScholarship.submitted = this.scholarshipForm.controls['submitted'].value;
    updatedScholarship.previouslyApplied = this.scholarshipForm.controls['previouslyApplied'].value;
    updatedScholarship.previouslyAwarded = this.scholarshipForm.controls['previouslyAwarded'].value;
    updatedScholarship.membershipRequired = this.scholarshipForm.controls['membershipRequired'].value;
    updatedScholarship.webpage = this.scholarshipForm.controls.webpage.value;
  }
}

export class ScholarshipChangeEvent {
  public scholarshipChanges: Scholarship;
  public newEntry: boolean;
}
