import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'lrock-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {

  @Input()
  public key: string;

  @Input()
  public keyResourceName: string;

  @Input()
  public value: any;

  public displayKey: string;

  public constructor(public translate: TranslateService) {
  }

  public ngOnInit(): void {
    if (this.key !== undefined) {
      this.displayKey = this.key;
    }
    else if (this.keyResourceName !== undefined) {
      this.translate.get(this.keyResourceName).subscribe(resourceValue => {
        this.displayKey = resourceValue.message;
      })
    }
  }
}
