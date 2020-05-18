import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Scholarship } from '../../../models/scholarship';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'scholarship-list',
  templateUrl: './scholarship-list.component.html',
  styleUrls: ['../../../../assets/scss/grid.scss', './scholarship-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScholarshipListComponent implements OnInit {
  @Input()
  public gridData: Observable<Scholarship[]>;

  @Output()
  public selectedScholarship: EventEmitter<string> = new EventEmitter<string>();

  protected errorDetail: any;
  protected pageNum: number;

  public constructor(public translate: TranslateService) { }

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editRecord(recordId: string) {
    console.log(recordId);
    this.selectedScholarship.emit(recordId);
  }
}
