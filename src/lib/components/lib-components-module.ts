import { NgModule } from "@angular/core";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { DateSelectComponent } from "./date-select/date-select.component";
import { TextAreaComponent } from "./textarea/textarea.component";
import { TextboxComponent } from "./textbox/textbox.component";

@NgModule({
  declarations: [
    CheckboxComponent,
    DateSelectComponent,
    TextAreaComponent,
    TextboxComponent
  ],
  imports: [ ],
  exports: [
    CheckboxComponent,
    DateSelectComponent,
    TextAreaComponent,
    TextboxComponent
  ]
})
export class LibComponentsModule { }
