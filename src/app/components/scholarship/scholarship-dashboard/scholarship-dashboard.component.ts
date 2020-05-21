import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Scholarship } from '../../../models/scholarship';
// import { ScholarshipChangeEvent } from '../scholarship-edit/scholarship-edit.component';
import { ScholarshipService } from '../../../services/scholarship-service';

@Component({
  selector: 'scholarship-dashboard',
  templateUrl: './scholarship-dashboard.component.html',
  styleUrls: ['./scholarship-dashboard.component.scss']
})
export class ScholarshipDashboardComponent implements OnInit {
  public readonly filterLabel = 'Filter';
  public readonly filterControlName = 'scholarshipFilter';

  public gridData: Observable<Scholarship[]>;
  public errorDetail: any;

  public selectedScholarship: Scholarship;
  public showEditForm: boolean = false;

  public activeFilter: string = undefined;
  public activeSort: string = undefined;

  constructor(private scholarshipService: ScholarshipService) {
    this.activeFilter = undefined;
    this.activeSort = '_sort=status,scholarshipName&_order=asc';
  }

  public ngOnInit(): void {
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
    if (selectedScholarshipId === undefined) {
      this.selectedScholarship = undefined;
      this.showEditForm = true;
    } else {
      this.scholarshipService.find(selectedScholarshipId).subscribe(scholarship => {
        this.selectedScholarship = scholarship;
        this.showEditForm = true;
      });
    }
  }

  public onSelectedFilterChanged(selectedFilter: string) {
    if (selectedFilter === 'ALL') {
      this.activeFilter = undefined;
    } else {
      this.activeFilter = `status=${selectedFilter}`;
    }
    this.refreshList();
  }

  public onCloseEdit(event: any /* TODO: ScholarshipChangeEvent */) {
    this.showEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }

  private refreshList() {
    this.scholarshipService.getAll(this.getFilterSortValue())
      .subscribe((records: Scholarship[]) => {
        this.gridData = of(records);
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

    return filterSortUrl;
  }
}
