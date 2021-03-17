import { NgModule } from "@angular/core";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { DateSelectComponent } from "./date-select/date-select.component";
import { KeyValueComponent } from "./key-value/key-value.component";
import { TextAreaComponent } from "./textarea/textarea.component";
import { TextboxComponent } from "./textbox/textbox.component";

@NgModule({
  declarations: [
    CheckboxComponent,
    DateSelectComponent,
    KeyValueComponent,
    TextAreaComponent,
    TextboxComponent
  ],
  imports: [ ],
  exports: [
    CheckboxComponent,
    DateSelectComponent,
    KeyValueComponent,
    TextAreaComponent,
    TextboxComponent
  ]
})
export class LibComponentsModule { }
