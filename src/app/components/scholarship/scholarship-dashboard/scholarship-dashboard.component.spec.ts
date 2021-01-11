import { TestBed } from '@angular/core/testing';
import { ScholarshipDashboardComponent } from './scholarship-dashboard.component';
import { ScholarshipService } from '../../../services/scholarship-service';

const unroll = require('unroll');
unroll.use(it);

describe('scholarship-dashboard component', () => {

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
    const fixture = TestBed.createComponent(ScholarshipDashboardComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
