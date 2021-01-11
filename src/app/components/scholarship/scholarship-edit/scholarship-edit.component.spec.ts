import { TestBed } from '@angular/core/testing';
import { ScholarshipEditComponent } from './scholarship-edit.component';

const unroll = require('unroll');
unroll.use(it);

describe('scholarship-edit component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
      /*
      TODO: what do you want?
      providers: [
        {
          provide: ScholarshipService,
          useValue: jasmine.createSpyObj('ScholarshipService', ['getAll'])
        }
      ]
      */
    });
  });

  it('should do something', () => {
    const fixture = TestBed.createComponent(ScholarshipEditComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
