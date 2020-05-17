import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { of } from 'rxjs';
import { UserListSpecPage } from './fixture/user-list.spec-page';
import { LoginDetails } from '../../../models/login-details';
import { UserService } from '../../../services/user-service';
import { randomTestData } from './node_modules/src/shared/test-utils/random-test-data';

const jasmine = require('jasmine');

let unroll = require('unroll');
unroll.use(it);

describe('User list component', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  let elements: UserListSpecPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', [ 'getAll' ])
        }
      ]
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    elements = new UserListSpecPage(fixture);
  });

  unroll('should display list where source is #description', (done: any, testArgs: any) => {
    let users: LoginDetails[] = testArgs['users'];
    component.gridData = of(users);
    fixture.detectChanges();

    jasmine.expect(elements.dataOuterElement).toExist();
    jasmine.expect(elements.dataOuterElement.length).toBe(testArgs['userListSize']);
    done();
  }, [
    [ 'users'                   , 'userListSize', 'description' ],
    [ randomTestData.userList(3), 3             , 'populated'   ],
    [ []                        , 0             , 'empty'       ],
    [ undefined                 , 0             , 'undefined'   ]
  ]);
});
