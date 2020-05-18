import { ComponentFixture } from '@angular/core/testing';
import { UserDashboardComponent } from '../user-dashboard.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class UserDashboardSpecPage {
  constructor(private fixture: ComponentFixture<UserDashboardComponent>) {}

  public get userEdit(): HTMLElement {
    return this.fixture.nativeElement.querySelector('user-edit');
  }

  public get userEditDebug(): DebugElement {
    return this.fixture.debugElement.query(By.css('user-edit'));
  }

  public get newUserButton(): HTMLElement {
    return this.fixture.nativeElement.querySelector('#newUserButton');
  }

  public get newUserButtonDebug(): DebugElement {
    return this.fixture.debugElement.query(By.css('#newUserButton'));
  }

  public get userList(): HTMLElement {
    return this.fixture.nativeElement.querySelector('user-list');
  }

  public get userListDebug(): DebugElement {
    return this.fixture.debugElement.query(By.css('user-list'));
  }
}
