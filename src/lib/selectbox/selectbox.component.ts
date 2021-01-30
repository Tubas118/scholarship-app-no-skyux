import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lrock-selectbox',
  templateUrl: './selectbox.component.html' //,
  //styleUrls: []
})
export class SelectValueComponent<T> implements OnInit, OnChanges {

  @Input()
  public parentForm: FormGroup;

  @Input()
  public label: string;

  @Input()
  public labelResourceName: string;

  @Input()
  public name: string;

  @Input()
  public value: string;

  @Input()
  public size: number;

  @Input()
  public list: T[];

  public displayList: SelectedItem[];

  @Output()
  public filterChanged: EventEmitter<any> = new EventEmitter<any>();

  public controlLabel: string;

  public constructor(public translate: TranslateService,
                     private formBuilder: FormBuilder) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(`Simple change: ${changes}`);
  }

  public ngOnInit(): void {
    if (this.label !== undefined) {
      this.controlLabel = this.label;
    }
    else if (this.labelResourceName !== undefined) {
      this.translate.get(this.labelResourceName).subscribe(resourceValue => {
        this.controlLabel = resourceValue.message;
      });
    }

    this.initDisplayList();
  }

  public onSelectedItemChanged(entry: any) {
    console.log(` onSelectedItemChanged: ${entry.target.value}`);
    this.filterChanged.emit(entry.target.value);
  }

  protected initDisplayList(): void {
    if (this.list !== undefined) {
      this.displayList = [];
      // this.list.forEach((entry: T) => this.displayList.push(entry.toString()));
      for (var entry of this.list) {
        //console.log(entry.toString());
        this.displayList.push({
          id: entry.toString(),
          display: entry.toString()
        })
      }
    }
  }
}

export interface SelectedItem {
  display: string;
  id: string;
}
