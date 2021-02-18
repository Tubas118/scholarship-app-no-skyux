import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ScholarshipView } from 'src/app/models/views/scholarship-view';
import { ScholarshipSupport } from 'src/app/models/model-support/scholarship-support';
import { Scholarship } from 'src/app/models/scholarship';

@Component({
  selector: 'scholarship-list',
  templateUrl: './scholarship-list.component.html',
  styleUrls: ['../../../../assets/scss/grid.scss', './scholarship-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScholarshipListComponent implements OnInit {
  @Input()
  public scholarshipGridData: Observable<ScholarshipView[]>;

  @Output()
  public selectedScholarship: EventEmitter<string> = new EventEmitter<string>();

  protected errorDetail: any;
  protected pageNum: number;

  public constructor(public translate: TranslateService,
                      private scholarshipSupport: ScholarshipSupport) { }

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editRecord(recordId: string) {
    this.selectedScholarship.emit(recordId);
  }

  public deadlineDateAlertLevelClass(record: any) {
    return 'lrock-alert-' + this.scholarshipSupport.dateAlertLevel(record?.deadlineDate);
  }

  public isValidDeadlineDate(scholarship: Scholarship) {
    return this.scholarshipSupport.isValidDate(scholarship?.deadlineDate);
  }
}
