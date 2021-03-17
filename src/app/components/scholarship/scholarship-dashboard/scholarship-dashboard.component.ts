import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { of, Observable, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScholarshipSupport } from 'src/app/models/model-support/scholarship-support';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { SponsorService } from 'src/app/services/sponsor-service';
import { Scholarship } from '../../../models/scholarship';
import { ScholarshipService } from '../../../services/scholarship-service';
import { ScholarshipEditComponent } from '../scholarship-edit/scholarship-edit.component';
import { ValidateDeactivation } from '../validate-deactivation';

@Component({
  selector: 'scholarship-dashboard',
  templateUrl: './scholarship-dashboard.component.html',
  styleUrls: ['./scholarship-dashboard.component.scss']
})
export class ScholarshipDashboardComponent extends ValidateDeactivation implements OnInit {
  public readonly filterLabel = 'Filter';
  public readonly filterControlName = 'scholarshipFilter';

  public scholarshipGridData: Observable<ScholarshipView[]>;
  public errorDetail: any;

  public selectedScholarship: Scholarship;
  public showScholarshipEditForm: boolean = false;

  public activeFilter: string = undefined;
  /** @deprecated */
  public activeSort: string = undefined;

  @ViewChild(ScholarshipEditComponent) scholarshipEdit: ScholarshipEditComponent;

  constructor(private scholarshipService: ScholarshipService,
              private scholarshipSupport: ScholarshipSupport) {
    super();
    this.activeFilter = undefined;
    // Deprecated in schema 11 -- this.activeSort = '_sort=status,scholarshipName&_order=asc';
  }

  public get debugId(): string {
    return (this.showScholarshipEditForm && this.scholarshipEdit !== undefined)
      ? this.scholarshipEdit.debugId : 'ScholarshipDashboardComponent';
  }

  public ngOnInit(): void {

    //Migration code
    /*
    const migrateUtil = new MigrateUtil(this.scholarshipService, this.sponsorService);
    migrateUtil.migrate();
    */

    this.refreshList();
  }

  /** @deprecated */
  public get scholarshipStatusList(): string[] {
    return this.scholarshipService.scholarshipStatusList;
  }

  /** @deprecated */
  public get scholarshipStatusFilterList(): string[] {
    return this.scholarshipService.scholarshipStatusFilterList;
  }

  public onNewScholarship() {
    this.onSelectedScholarship(undefined);
  }

  public onSelectedScholarship(selectedScholarshipId: string) {
    if (selectedScholarshipId === undefined) {
      this.selectedScholarship = undefined;
      this.showScholarshipEditForm = true;
    }
    else {
      this.scholarshipService.find(selectedScholarshipId)
        .pipe(
          take(1)
        )
        .subscribe(scholarship => {
          this.showScholarshipEditForm = true;
          this.selectedScholarship = {
            ...scholarship
          } as ScholarshipView;
        });
    }
  }

  public onCloseEdit(event: any /* TODO: ScholarshipChangeEvent */) {
    if (this.scholarshipEdit?.getBulkTaskActionOccurred()) {
      this.scholarshipEdit?.resetBulkTaskActionOccurred();
      this.refreshList();
      return;
    }

    this.showScholarshipEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }

  public get validateForDeactivation(): boolean {
    return (this.showScholarshipEditForm && this.scholarshipEdit !== undefined)
      ? this.scholarshipEdit.validateForDeactivation : false;
  }

  private refreshList() {
    this.scholarshipService.getAllViews(this.getFilterSortValue())
      .pipe(take(1))
      .subscribe((records: ScholarshipView[]) => {
        records.sort((a, b) => this.scholarshipSupport.compare(a, b));
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

    if (this.activeFilter) {
      if (this.activeFilter) {
        filterSortList.push(this.activeFilter);
      }
      filterSortUrl = '?' + filterSortList.join('&');
    }

    return filterSortUrl;
  }
}
