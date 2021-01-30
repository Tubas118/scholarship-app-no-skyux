import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../../../models/sponsor';

@Component({
  selector: 'sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['../../../../assets/scss/grid.scss', './sponsor-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorListComponent implements OnInit {
  @Input()
  public gridData: Observable<Sponsor[]>;

  @Output()
  public selectedSponsor: EventEmitter<string> = new EventEmitter<string>();

  protected errorDetail: any;
  protected pageNum: number;

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editRecord(recordId: string) {
    console.log(recordId);
    this.selectedSponsor.emit(recordId);
  }
}
