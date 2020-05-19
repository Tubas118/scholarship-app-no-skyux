import { TestBed } from '@angular/core/testing';
import { SkyAppTestModule } from '@skyux-sdk/builder/runtime/testing/browser';
import { expect } from '@skyux-sdk/testing';
import { ScholarshipListComponent } from './scholarship-list.component';
import { ScholarshipService } from '../../../services/scholarship-service';

describe('scholarship-list component', () => {

  /**
   * This configureTestingModule function imports SkyAppTestModule, which brings in all of
   * the SKY UX modules and components in your application for testing convenience. If this has
   * an adverse effect on your test performance, you can individually bring in each of your app
   * components and the SKY UX modules that those components rely upon.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAppTestModule]
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
    const fixture = TestBed.createComponent(ScholarshipListComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
