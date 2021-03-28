import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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

  @Input()
  public observableList: Observable<T[]>;

  public displayList: SelectedItem[];

  @Output()
  public filterChanged: EventEmitter<any> = new EventEmitter<any>();

  public controlLabel: string;

  public constructor(public translate: TranslateService,
                     private formBuilder: FormBuilder) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    //console.log(`Simple change: ${changes}`);
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
    this.filterChanged.emit(entry.target.value);
  }

  protected initDisplayList(): void {
    if (this.observableList !== undefined) {
      this.initDisplayListFromObservable();
    }
    else {
      this.initDisplayListFromReadyList();
    }
  }

  protected initDisplayListFromObservable() {
    this.observableList
      .pipe(take(1))
      .subscribe(entries => {
        this.list = entries;
        this.initDisplayListFromReadyList();
      });
  }

  protected initDisplayListFromReadyList() {
    if (this.list !== undefined && this.list.length > 0) {
      let displayList = [];
      for (var entry of this.list) {
        let selectedItem = {
          ...entry as any
        } as SelectedItem;

        displayList.push({
          id: selectedItem.id !== undefined ? selectedItem.id : selectedItem.toString(),
          display: selectedItem.id !== undefined ? selectedItem.display : selectedItem.toString()
        })
      }
      this.displayList = displayList;
    }
  }
}

export interface SelectedItem {
  display: string;
  id: string;
}
