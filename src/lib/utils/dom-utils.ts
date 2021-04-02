import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class BaseSpecPage<C> {
  constructor(public fixture: ComponentFixture<C>) { }
}

export class ChildElementGetterByCssName<T extends HTMLElement> {
  constructor(private cssName: string) { }

  debugElement(parentElement: DebugElement): DebugElement {
    return parentElement.query(By.css(this.cssName));
  }

  element(parentElement: HTMLElement): T {
    return (parentElement.querySelector(this.cssName) as unknown) as T;
  }
}

export class ElementGetterByCssName<T extends HTMLElement> {
  constructor(private cssName: string, private baseSpecPage: BaseSpecPage<any>) { }

  get debugElement(): DebugElement {
    return this.baseSpecPage.fixture.debugElement.query(By.css(this.cssName));
  }

  get element(): T {
    return (this.baseSpecPage.fixture.nativeElement.querySelector(this.cssName) as unknown) as T;
  }
}

export class ElementArrayGetterByCssName<T extends HTMLElement[]> {
  constructor(private cssName: string, private baseSpecPage: BaseSpecPage<any>) { }

  get debugElements(): DebugElement[] {
    return this.baseSpecPage.fixture.debugElement.queryAll(By.css(this.cssName));
  }

  get elements(): T {
    return (this.baseSpecPage.fixture.nativeElement.querySelectorAll(this.cssName) as any) as T;
  }
}
