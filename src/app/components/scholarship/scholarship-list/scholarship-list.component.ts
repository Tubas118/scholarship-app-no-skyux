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
  protected skipEditRecord = false;

  public constructor(public translate: TranslateService,
                      private scholarshipSupport: ScholarshipSupport) { }

  public ngOnInit() {
    this.pageNum = 0;
  }

  public onUrlClicked(entry: ScholarshipView) {
    if (entry?.webpage !== undefined) {
      this.skipEditRecord = true;
    }
  }

  public editRecord(recordId: string) {
    if (this.skipEditRecord === false) {
      this.selectedScholarship.emit(recordId);
    }
    this.skipEditRecord = false;
  }

  public deadlineDateAlertLevelClass(record: any) {
    return 'lrock-alert-' + this.scholarshipSupport.alertLevelFromDate(record?.deadlineDate);
  }

  public isValidDeadlineDate(scholarship: Scholarship) {
    return this.scholarshipSupport.isValidDate(scholarship?.deadlineDate);
  }
}
