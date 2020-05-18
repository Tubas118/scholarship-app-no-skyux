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
  public gridData: Observable<Scholarship[]>;
  public errorDetail: any;

  public selectedScholarship: Scholarship;
  public showEditForm: boolean = false;

  constructor(private scholarshipService: ScholarshipService) {
  }

  public ngOnInit(): void {
    this.scholarshipService.getAll()
      .subscribe((records: Scholarship[]) => {
        this.gridData = of(records);
      },
      err => {
        console.error('Error ' + err);
        this.errorDetail = err;
      });
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

  public onCloseEdit(event: any /* TODO: ScholarshipChangeEvent */) {
    this.showEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }
}
