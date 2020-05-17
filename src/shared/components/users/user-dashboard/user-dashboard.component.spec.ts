import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardSpecPage } from './fixture/user-dashboard.spec-page';
import { UserService } from '../../../services/user-service';
import { randomTestData } from '../../../test-utils/random-test-data';

const jasmine = require('jasmine');

describe('Users dashboard component', () => {
  let fixture: ComponentFixture<UserDashboardComponent>;
  let component: UserDashboardComponent;
  let elements: UserDashboardSpecPage;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const expectedAllUsers = of(randomTestData.userList());

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', ['getAll'])
        }
      ]
    });

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    elements = new UserDashboardSpecPage(fixture);
    userService = TestBed.get(UserService);
    userService.getAll.and.returnValue(expectedAllUsers);
  });

  it('toggle state', () => {
    fixture.detectChanges();

    jasmine.expect(elements.userEditDebug).not.toExist();
    jasmine.expect(elements.newUserButtonDebug).toExist();
    jasmine.expect(elements.userListDebug).toExist();

    elements.newUserButton.click();
    fixture.detectChanges();

    jasmine.expect(elements.userEditDebug).toExist();
    jasmine.expect(elements.newUserButtonDebug).not.toExist();
    jasmine.expect(elements.userListDebug).not.toExist();
  });

});
