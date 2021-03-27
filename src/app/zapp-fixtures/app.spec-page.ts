import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppComponent } from "../app.component";

export class AppSpecPage {
  constructor(private fixture: ComponentFixture<AppComponent>) { }

  public get titleElement(): HTMLElement {
    return this.titleDebugElement.nativeElement;
  }

  public get titleDebugElement(): DebugElement {
    return this.fixture.debugElement.query(By.css('.ctn-title'));
  }
}
