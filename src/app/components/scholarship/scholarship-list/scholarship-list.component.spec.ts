import { TestBed } from '@angular/core/testing';
import { ScholarshipListComponent } from './scholarship-list.component';
import { ScholarshipService } from '../../../services/scholarship-service';

describe('scholarship-list component', () => {

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
    const fixture = TestBed.createComponent(ScholarshipListComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
