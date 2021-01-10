import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task-service';
import { ScholarshipTaskView } from '../../../models/views/scholarship-task-view';
import { TaskChangeEvent } from '../../task/task-change-event';

@Component({
  selector: 'scholarship-task-view-dashboard',
  templateUrl: './scholarship-task-view-dashboard.component.html',
  styleUrls: ['./scholarship-task-view-dashboard.component.scss']
})
export class ScholarshipTaskViewDashboardComponent implements OnInit {
  public gridData: Observable<ScholarshipTaskView[]>;
  public errorDetail: any;

  public selectedScholarshipTaskView: ScholarshipTaskView;
  public showEditForm: boolean = false;

  constructor(private taskService: TaskService) {
  }

  public ngOnInit(): void {
    // this.taskService.getAllScholarshipTaskViews()
    //   .then((records: ScholarshipTaskView[]) => {
    //     this.gridData = of(records);
    //   },
    //   err => {
    //     console.error('Error ' + err);
    //     this.errorDetail = err;
    //   });
  }

  public onNewScholarshipTaskView() {
    this.onSelectedScholarshipTaskView(undefined);
  }

  public onSelectedScholarshipTaskView(selectedScholarshipTaskViewId: string) {
    if (selectedScholarshipTaskViewId === undefined) {
      this.selectedScholarshipTaskView = undefined;
      this.showEditForm = true;
    } else {
      // TODO: implement
      // this.taskService.findScholarshipTaskViewByTaskId(selectedScholarshipTaskViewId).subscribe(scholarshipTaskView => {
      //   this.selectedScholarshipTaskView = scholarshipTaskView;
      //   this.showEditForm = true;
      // });
    }
  }

  public onCloseEdit(event: TaskChangeEvent) {
    this.showEditForm = false;
    if (event !== undefined) {
      this.ngOnInit();
    }
  }
}
