import { TestBed } from '@angular/core/testing';
import { SponsorEditComponent } from './sponsor-edit.component';
import { SponsorService } from '../../../services/sponsor-service';

describe('sponsor-edit component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
      /*
      TODO: what do you want?
      providers: [
        {
          provide: SponsorService,
          useValue: jasmine.createSpyObj('SponsorService', ['getAll'])
        }
      ]
      */
    });
  });

  it('should do something', () => {
    const fixture = TestBed.createComponent(SponsorEditComponent);

    fixture.detectChanges();

    expect(true).toBe(false);
  });

});
