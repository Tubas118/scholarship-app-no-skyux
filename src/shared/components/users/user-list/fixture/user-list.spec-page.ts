import { ComponentFixture } from '@angular/core/testing';
import { UserListComponent } from '../user-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export class UserListSpecPage {
  constructor(private fixture: ComponentFixture<UserListComponent>) {}

  public get fluidGrid(): HTMLElement {
    return this.fixture.nativeElement.querySelector('sky-fluid-grid');
  }

  public get dataOuterElement(): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css('.data-outer'));
  }
}
