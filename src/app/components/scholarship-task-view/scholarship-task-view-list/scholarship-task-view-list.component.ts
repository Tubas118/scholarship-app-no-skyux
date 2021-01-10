import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ScholarshipTaskView } from '../../../models/views/scholarship-task-view';

@Component({
  selector: 'scholarship-task-view-list',
  templateUrl: './scholarship-task-view-list.component.html',
  styleUrls: ['../../../../assets/scss/grid.scss', './scholarship-task-view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScholarshipTaskViewListComponent implements OnInit {
  @Input()
  public gridData: Observable<ScholarshipTaskView[]>;

  @Output()
  public selectedScholarshipTaskView: EventEmitter<string> = new EventEmitter<string>();

  protected errorDetail: any;
  protected pageNum: number;

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editRecord(recordId: string) {
    console.log(recordId);
    this.selectedScholarshipTaskView.emit(recordId);
  }
}
