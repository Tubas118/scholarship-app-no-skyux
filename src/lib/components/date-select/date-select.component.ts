import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lrock-date-select',
  templateUrl: './date-select.component.html' //,
  //styleUrls: []
})
export class DateSelectComponent implements OnInit {

  @Input()
  public parentForm: FormGroup;

  @Input()
  public label: string;

  @Input()
  public labelResourceName: string;

  @Input()
  public dateClass: string;

  @Input()
  public name: string;

  @Input()
  public value: string;

  public controlLabel: string;

  public constructor(public translate: TranslateService,
                     private formBuilder: FormBuilder) {
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
  }
}
