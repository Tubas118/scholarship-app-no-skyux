import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Sponsor } from '../../../models/sponsor';
import { SponsorChangeEvent } from '../sponsor-edit/sponsor-edit.component';
import { SponsorService } from '../../../services/sponsor-service';

@Component({
  selector: 'sponsor-dashboard',
  templateUrl: './sponsor-dashboard.component.html',
  styleUrls: ['./sponsor-dashboard.component.scss']
})
export class SponsorDashboardComponent implements OnInit {
  public gridData: Observable<Sponsor[]>;
  public errorDetail: any;

  public selectedSponsor: Sponsor;
  public showEditForm: boolean = false;

  public activeSort: string = undefined;

  constructor(private sponsorService: SponsorService) {
    this.activeSort = '_sort=sponsor&_order=asc';
  }

  public ngOnInit(): void {
    this.refreshList();
  }

  public onNewSponsor() {
    this.onSelectedSponsor(undefined);
  }

  public onSelectedSponsor(selectedSponsorId: string) {
    if (selectedSponsorId === undefined) {
      this.selectedSponsor = undefined;
      this.showEditForm = true;
    }
    else {
      this.sponsorService.find(selectedSponsorId).subscribe(sponsor => {
        this.selectedSponsor = sponsor;
        this.showEditForm = true;
      });
    }
  }

  public onCloseEdit(event: SponsorChangeEvent) {
    this.showEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }

  private refreshList() {
    const sortUrl = (this.activeSort === undefined) ? "" : "?" + this.activeSort;

    this.sponsorService.getAll(sortUrl)
      .subscribe((records: Sponsor[]) => {
        this.gridData = of(records);
      },
        err => {
          console.error('Error ' + err);
          this.errorDetail = err;
        });
  }
}
