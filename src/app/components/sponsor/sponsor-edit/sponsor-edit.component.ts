import { Component, OnChanges, Output, EventEmitter, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Sponsor } from '../../../models/sponsor';
import { FormGroup, FormControl } from '@angular/forms';
import { SponsorService } from '../../../services/sponsor-service';
import { newSponsor } from '../../../models/model-support/app-data-utils';

@Component({
  selector: 'sponsor-edit',
  templateUrl: './sponsor-edit.component.html',
  styleUrls: ['./sponsor-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorEditComponent implements OnChanges {

  @Input()
  public sponsorDetails: Sponsor;

  @Input()
  public showEditForm: boolean = false;

  @Output()
  public closeEvent: EventEmitter<SponsorChangeEvent> = new EventEmitter<SponsorChangeEvent>();

  public sponsorForm: FormGroup;

  private newEntryMode: boolean;

  constructor(private sponsorService: SponsorService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showEditForm) {
      this.sponsorForm = this.intializeFormGroup(this.sponsorDetails);
    }
  }

  public onCancel(event: any) {
    this.sponsorForm.reset();
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
    if (this.isValid(this.sponsorDetails.id) && this.sponsorDetails.id.trim().length === 0) {
      this.sponsorDetails.id = undefined;
    }
    this.sponsorService.add(this.sponsorDetails).subscribe(result => {
      this.closeEvent.emit({ sponsorChanges: result, newEntry: true });
      this.close();
    });
  }

  private updateExistingEntry() {
    this.sponsorService.update(this.sponsorDetails).subscribe(result => {
      this.closeEvent.emit({ sponsorChanges: result, newEntry: false });
      this.close();
    });
  }

  private intializeFormGroup(sponsor: Sponsor): FormGroup {
    this.newEntryMode = (sponsor === undefined);
    this.sponsorDetails = (this.newEntryMode) ? newSponsor() : sponsor;
    return new FormGroup({
      sponsor: new FormControl(this.sponsorDetails.sponsor),
      contactInfo: new FormControl(this.sponsorDetails.contactInfo),
      contactPhone: new FormControl(this.sponsorDetails.contactPhone),
      contactEmail: new FormControl(this.sponsorDetails.contactEmail),
    });
  }

  private updateInternalData() {
      this.sponsorDetails.sponsor = this.sponsorForm.controls['sponsor'].value;
      this.sponsorDetails.contactInfo = this.sponsorForm.controls['contactInfo'].value;
      this.sponsorDetails.contactPhone = this.sponsorForm.controls['contactPhone'].value;
      this.sponsorDetails.contactEmail = this.sponsorForm.controls['contactEmail'].value;
  }
}

export class SponsorChangeEvent {
  public sponsorChanges: Sponsor;
  public newEntry: boolean;
}
