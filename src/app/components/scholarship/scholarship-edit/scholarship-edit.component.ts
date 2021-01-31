import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Scholarship } from '../../../models/scholarship';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ScholarshipService } from '../../../services/scholarship-service';
import { newScholarship } from '../../../models/model-support/app-data-utils';
import { TranslateService } from '@ngx-translate/core';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { Task } from 'src/app/models/task';
import { SponsorService } from 'src/app/services/sponsor-service';
import { SelectedItem } from 'src/lib/components/selectbox/selectbox.component';
import { Observable } from 'rxjs';
import { ValidateDeactivation } from '../validate-deactivation';
import { deepEqual } from '../../../../lib/utils/equality';

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

  @Output()
  public closeEvent: EventEmitter<ScholarshipChangeEvent> = new EventEmitter<ScholarshipChangeEvent>();

  @Output()
  public tasksEvent: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  public scholarshipForm: FormGroup;

  private initialScholarshipDetails: ScholarshipView;
  private validateScholarshipDetails: ScholarshipView;

  private selectedStatus: string;
  private newEntryMode: boolean;
  private changesSubmitted = false;

  constructor(public translate: TranslateService,
              private formBuilder: FormBuilder,
              private sponsorService: SponsorService,
              private scholarshipService: ScholarshipService) {
    super();
  }

  public ngOnInit(): void {
    console.log(`emit tasks: ${JSON.stringify(this.scholarshipDetails?.tasks)}`);
    this.tasksEvent.emit(this.scholarshipDetails?.tasks);
  }

  public get sponsorSelectList(): Observable<SelectedItem[]> {
    return this.scholarshipService.getSponsorSelectList();
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

  public get debugId(): string {
    return 'ScholarshipEditComponent';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showScholarshipEditForm) {
      this.scholarshipForm = this.intializeFormGroup(this.scholarshipDetails);
      // Deprecated in schema 11 -- this.selectedStatus = this.scholarshipDetails.status;
    }
  }

  public onSelectedStatusChanged(entry: any) {
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
    this.updateInternalData(this.scholarshipDetails);
    this.changesSubmitted = true;

    if (this.newEntryMode) {
      this.addNewEntry();
    } else {
      this.updateExistingEntry();
    }
  }

  public close() {
    if (this.isOkayToClose()) {
      this.showScholarshipEditForm = false;
    }
  }

  public get validateForDeactivation(): boolean {
    console.log('Closing...');
    if (!this.changesSubmitted) {
      console.log('Closing but data not submitted');
      this.validateScholarshipDetails = {
        ...this.initialScholarshipDetails
      } as ScholarshipView;
      this.updateInternalData(this.validateScholarshipDetails);
      const checkView: ScholarshipView = (this.validateScholarshipDetails !== undefined) ? this.validateScholarshipDetails : this.scholarshipDetails;
      return this.isDirtyWorker(checkView);
    }

    return false;
  }

  protected isDirtyWorker(checkScholarshipDetails: ScholarshipView): boolean {
    console.log(`changesSubmitted=${this.changesSubmitted}`);
    console.log(`checkView: ${JSON.stringify(checkScholarshipDetails)}`);
    console.log(`initView:  ${JSON.stringify(this.initialScholarshipDetails)}`);
    let isDirtyResult = (!this.changesSubmitted && !deepEqual(this.initialScholarshipDetails, checkScholarshipDetails));
    console.log(`ScholarshipEditComponent - isDirty=${isDirtyResult}`);
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
    this.initialScholarshipDetails = {
      ...this.scholarshipDetails
    };

    return this.formBuilder.group({
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
      membershipRequired: new FormControl(this.scholarshipDetails.membershipRequired || false)
    });
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
  }
}

export class ScholarshipChangeEvent {
  public scholarshipChanges: Scholarship;
  public newEntry: boolean;
}
