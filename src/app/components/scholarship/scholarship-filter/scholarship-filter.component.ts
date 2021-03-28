import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'scholarship-filter',
  templateUrl: './scholarship-filter.component.html',
  styleUrls: ['./scholarship-filter.component.scss']
})
export class ScholarshipFilterComponent implements OnChanges {

  @Input()
  public filterLabel: string;

  @Input()
  public filterList: string[];

  @Output()
  public filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    //console.log(`Simple change: ${changes}`);
  }

  public onSelectedItemChanged(entry: any) {
    this.filterChanged.emit(entry.target.value);
  }
}
