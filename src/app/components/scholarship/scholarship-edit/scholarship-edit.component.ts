import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Scholarship } from '../../../models/scholarship';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ScholarshipService } from '../../../services/scholarship-service';
import { newScholarship } from '../../../models/model-support/app-data-utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'scholarship-edit',
  templateUrl: './scholarship-edit.component.html',
  styleUrls: ['./scholarship-edit.component.scss']
})
export class ScholarshipEditComponent implements OnChanges {

  @Input()
  public scholarshipDetails: Scholarship;

  @Input()
  public showEditForm: boolean = false;

  @Output()
  public closeEvent: EventEmitter<ScholarshipChangeEvent> = new EventEmitter<ScholarshipChangeEvent>();

  public scholarshipForm: FormGroup;

  private selectedStatus: string;
  private newEntryMode: boolean;

  constructor(public translate: TranslateService,
    private formBuilder: FormBuilder,
    private scholarshipService: ScholarshipService) {
  }

  public get scholarshipStatusList(): string[] {
    let answer = ScholarshipService.masterScholarshipStatusList();
    console.log(`scholarshipStatusList: ${answer}`);
    return answer;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showEditForm) {
      this.scholarshipForm = this.intializeFormGroup(this.scholarshipDetails);
      this.selectedStatus = this.scholarshipDetails.status;
    }
  }

  public onSelectedItemChanged(entry: string) {
    this.selectedStatus = entry;
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
    this.showEditForm = false;
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

  private intializeFormGroup(scholarship: Scholarship): FormGroup {
    this.newEntryMode = (scholarship === undefined);
    this.scholarshipDetails = (this.newEntryMode) ? newScholarship() : scholarship;
    return this.formBuilder.group({
      scholarshipName: new FormControl(this.scholarshipDetails.scholarshipName),
      scholarshipTargetAmount: new FormControl(this.scholarshipDetails.targetAmount),
      sponsor: new FormControl(this.scholarshipDetails.sponsor),
      sponsorContactInfo: new FormControl(this.scholarshipDetails.sponsorContactInfo),
      contactPhone: new FormControl(this.scholarshipDetails.contactPhone),
      contactEmail: new FormControl(this.scholarshipDetails.contactEmail  /* , SkyValidators.email */),
      status: new FormControl(this.scholarshipDetails.status)
    });
  }

  private updateInternalData() {
    this.scholarshipDetails.scholarshipName = this.scholarshipForm.controls['scholarshipName'].value;
    this.scholarshipDetails.targetAmount = this.scholarshipForm.controls['targetAmount'].value;
    this.scholarshipDetails.sponsor = this.scholarshipForm.controls['sponsor'].value;
    this.scholarshipDetails.sponsorContactInfo = this.scholarshipForm.controls['sponsorContactInfo'].value;
    this.scholarshipDetails.contactPhone = this.scholarshipForm.controls['contactPhone'].value;
    this.scholarshipDetails.contactEmail = this.scholarshipForm.controls['contactEmail'].value;
    this.scholarshipDetails.status = this.selectedStatus;
  }
}

export class ScholarshipChangeEvent {
  public scholarshipChanges: Scholarship;
  public newEntry: boolean;
}
