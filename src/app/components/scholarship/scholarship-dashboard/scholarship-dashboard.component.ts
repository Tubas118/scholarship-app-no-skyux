import { Component, OnInit } from '@angular/core';
import { of, Observable, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { MigrateUtil } from 'src/app/models/migrate/migrate';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { SponsorService } from 'src/app/services/sponsor-service';
import { Scholarship } from '../../../models/scholarship';
import { ScholarshipService } from '../../../services/scholarship-service';

@Component({
  selector: 'scholarship-dashboard',
  templateUrl: './scholarship-dashboard.component.html',
  styleUrls: ['./scholarship-dashboard.component.scss']
})
export class ScholarshipDashboardComponent implements OnInit {
  public readonly filterLabel = 'Filter';
  public readonly filterControlName = 'scholarshipFilter';

  public scholarshipGridData: Observable<ScholarshipView[]>;
  public errorDetail: any;

  public selectedScholarship: Scholarship;
  public showScholarshipEditForm: boolean = false;

  public activeFilter: string = undefined;
  public activeSort: string = undefined;

  constructor(private scholarshipService: ScholarshipService,
              private sponsorService: SponsorService) {
    this.activeFilter = undefined;
    this.activeSort = '_sort=status,scholarshipName&_order=asc';
  }

  public ngOnInit(): void {
    /*
    Migration code
    const migrateUtil = new MigrateUtil(this.scholarshipService, this.sponsorService);
    migrateUtil.migrate();
    */

    this.refreshList();
  }

  public get scholarshipStatusList(): string[] {
    return this.scholarshipService.scholarshipStatusList;
  }

  public get scholarshipStatusFilterList(): string[] {
    return this.scholarshipService.scholarshipStatusFilterList;
  }

  public onNewScholarship() {
    this.onSelectedScholarship(undefined);
  }

  public onSelectedScholarship(selectedScholarshipId: string) {
    console.log(`scholarship-dashboard.onSelectedScholarship: ${selectedScholarshipId}`);
    if (selectedScholarshipId === undefined) {
      this.selectedScholarship = undefined;
      this.showScholarshipEditForm = true;
    } else {
      this.scholarshipService.find(selectedScholarshipId)
        .pipe(
          take(1)
        )
        .subscribe(scholarship => {
          console.log(`scholarship-dashboard.onSelectedScholarship: ${JSON.stringify(scholarship)}`);
          this.showScholarshipEditForm = true;
          this.selectedScholarship = {
            ...scholarship
          } as ScholarshipView;
        });
    }
  }

  public onSelectedFilterChanged(selectedFilter: string) {
    if (selectedFilter === 'ALL') {
      this.activeFilter = undefined;
    } else {
      if (selectedFilter === 'SUBMITTED') {
        this.activeFilter = `submitted=true`;
      }
      else {
        this.activeFilter = `status=${selectedFilter}`;
      }
    }
    this.refreshList();
  }

  public onCloseEdit(event: any /* TODO: ScholarshipChangeEvent */) {
    this.showScholarshipEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }

  private refreshList() {
    this.scholarshipService.getAllViews(this.getFilterSortValue())
      .pipe(take(1))
      .subscribe((records: ScholarshipView[]) => {
        this.scholarshipGridData = of(records);
      },
      err => {
        console.error('Error ' + err);
        this.errorDetail = err;
      });
  }

  private getFilterSortValue(): string {
    let filterSortUrl: string = '';
    let filterSortList: string[] = [];

    if (this.activeSort || this.activeFilter) {
      if (this.activeSort) {
        filterSortList.push(this.activeSort);
      }
      if (this.activeFilter) {
        filterSortList.push(this.activeFilter);
      }
      filterSortUrl = '?' + filterSortList.join('&');
    }

    console.log(`filterSortUrl=${filterSortUrl}`);
    return filterSortUrl;
  }
}
