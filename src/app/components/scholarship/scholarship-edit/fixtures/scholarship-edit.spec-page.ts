import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BaseSpecPage, TextboxGetterByName } from "src/lib/utils/dom-utils";
import { ScholarshipEditComponent } from "../scholarship-edit.component";
//import { lrock.testing.TextboxGetterByCssName }

export class ScholarshipEditSpecPage extends BaseSpecPage<ScholarshipEditComponent> {
  constructor(public fixture: ComponentFixture<ScholarshipEditComponent>) {
    super(fixture);
  }

  readonly scholarshipName = new TextboxGetterByName('scholarshipName', this);

  // get scholarshipName() {
  //   const name = 'scholarshipName';
  //   let elements = this.fixture.nativeElement.querySelectorAll(`lrock-textbox[name="${name}"]`);
  //   if (elements !== undefined && elements.length > 0) {
  //     console.log(`element html: ${elements[0].nativeElement.innerHTML}`);
  //   }
  //   return (elements !== undefined) ? elements[0].nativeElement : undefined;
  // }

  // get scholarshipNameElement() {
  //   let elements = this.fixture.debugElement.queryAll(By.css(`input[formControlName="scholarshipName"]`));
  //   // let elements = this.fixture.debugElement.queryAllNodes(By.css(`input[formControlName="scholarshipName"]`));
  //   // let elements: HTMLElement[] = this.fixture.nativeElement.querySelectorAll('input[formControlName="scholarshipName"]');
  //   // let elements = this.fixture.debugElement.queryAll(By.css(`input`));
  //   // console.log(`html ${this.fixture.nativeElement?.innerHTML}`);
  //   console.log(`# input: ${elements?.length}`);
  //   if (elements !== undefined && elements.length > 0) {
  //     console.log(`html: ${this.fixture.nativeElement.innerHTML}`);
  //     elements.forEach((element, idx) => {
  //       console.log(`${idx} - element html: ${element.nativeElement?.innerHTML}`);
  //       // console.log(`${idx} = ${element.componentInstance.html}`);
  //     });
  //   }
  //   return (elements !== undefined && elements.length > 0) ? elements[0] : undefined;
  // }
}
