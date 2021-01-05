import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lrock-textarea',
  templateUrl: './textarea.component.html' //,
  //styleUrls: []
})
export class TextAreaComponent implements OnInit {

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
  public rows: number;

  @Input()
  public columns: number;

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
