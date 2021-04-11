import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export class BaseSpecPage<C> {
  constructor(public fixture: ComponentFixture<C>) { }
}

export class ChildElementGetterByCssName<T extends HTMLElement> {
  constructor(public readonly cssName: string) { }

  debugElement(parentElement: DebugElement): DebugElement {
    return parentElement.query(By.css(this.cssName));
  }

  element(parentElement: HTMLElement): T {
    return (parentElement.querySelector(this.cssName) as unknown) as T;
  }
}

export class ElementGetterByCssName<T extends HTMLElement> {
  constructor(public readonly cssName: string, protected baseSpecPage: BaseSpecPage<any>) { }

  get debugElement(): DebugElement {
    return this.baseSpecPage.fixture.debugElement.query(By.css(this.cssName));
  }

  get element(): T {
    return (this.baseSpecPage.fixture.nativeElement.querySelector(this.cssName) as unknown) as T;
  }
}

export class ElementArrayGetterByCssName<T extends HTMLElement> {
  constructor(public readonly cssName: string, private baseSpecPage: BaseSpecPage<any>) { }

  get debugElements(): DebugElement[] {
    return this.baseSpecPage.fixture.debugElement.queryAll(By.css(this.cssName));
  }

  get elements(): T[] {
    return (this.baseSpecPage.fixture.nativeElement.querySelectorAll(this.cssName) as any[]) as T[];
  }

  get firstDebugElement(): DebugElement {
    return (this.debugElements !== undefined && this.debugElements.length > 0) ? this.debugElements[0] : undefined;
  }

  get firstElement(): T {
    return (this.elements !== undefined && this.elements.length)
      ? (this.elements[0] as any) as T
      : undefined;
  }
}

// export class LRockInputGetterByCssName<T extends HTMLElement> extends ElementGetterByCssName<T> {
//   constructor(public readonly cssName: string, protected baseSpecPage: BaseSpecPage<any>) {
//     super(cssName, baseSpecPage);
//   }

//   get labelDebug(): DebugElement {
//     let elementDebug = this.baseSpecPage.fixture.debugElement.query(By.css(this.cssName));
//     return elementDebug?.query(By.css('label'));
//   }

//   get label(): HTMLLabelElement {
//     let element = this.baseSpecPage.fixture.nativeElement.querySelector(this.cssName) as HTMLElement;
//     return element?.querySelector('label') as HTMLLabelElement;
//   }

//   get inputDebug(): DebugElement {
//     return this.baseSpecPage.fixture.nativeElement?.query(By.css(`input[formControlName="${this.name}]"`));
//   }

//   get input(): HTMLInputElement {
//     let textboxElement = this.baseSpecPage.fixture.nativeElement.querySelector(`lrock-textbox[name="${this.name}"]`);
//     return textboxElement.querySelector('input') as HTMLInputElement;
//   }
// }

export enum LRockInputTypes {
  checkbox
}

export class LRockInputGetterByName {
  private typeAttr: string;

  constructor(public readonly tagname, public readonly name: string, public readonly type: LRockInputTypes, protected baseSpecPage: BaseSpecPage<any>) {
    this.typeAttr = (type !== undefined) ? `[type="${LRockInputTypes[type]}"]` : "";
  }

  get labelDebug(): DebugElement {
    let elementDebug = this.baseSpecPage.fixture.debugElement.query(By.css(`${this.tagname}[name="${this.name}"]`));
    return elementDebug?.query(By.css(`label[for="${this.name}"]`));
  }

  get label(): HTMLLabelElement {
    let element = this.baseSpecPage.fixture.nativeElement.querySelector(`${this.tagname}[name="${this.name}"]`) as HTMLElement;
    return element?.querySelector(`label[for="${this.name}"]`) as HTMLLabelElement;
  }

  get inputDebug(): DebugElement {
    let elementDebug = this.baseSpecPage.fixture.nativeElement.query(By.css(`${this.tagname}[name="${this.name}"]`));
    return elementDebug?.query(By.css(`input${this.typeAttr}`));
  }

  get input(): HTMLInputElement {
    let textboxElement = this.baseSpecPage.fixture.nativeElement.querySelector(`${this.tagname}[name="${this.name}"]`);
    return textboxElement.querySelector(`input${this.typeAttr}`) as HTMLInputElement;
  }
}

export class CheckboxGetterByName extends LRockInputGetterByName {
  constructor(public readonly name: string, protected baseSpecPage: BaseSpecPage<any>) {
    super('lrock-checkbox', name, LRockInputTypes.checkbox, baseSpecPage);
  }
}

export class TextboxGetterByName extends LRockInputGetterByName {
  constructor(public readonly name: string, protected baseSpecPage: BaseSpecPage<any>) {
    super('lrock-textbox', name, undefined, baseSpecPage);
  }
}
