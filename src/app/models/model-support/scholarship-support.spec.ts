import { DatePipe } from "@angular/common";
import { TestBed } from "@angular/core/testing"
import { ScholarshipSupport } from "./scholarship-support"
import { TaskSupport } from "./task-support";

describe('scholarship-support', () => {
  let scholarshipSupport: ScholarshipSupport;
  let today: Date = new Date();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatePipe,
        ScholarshipSupport,
        TaskSupport
      ]
    });

    scholarshipSupport = TestBed.inject(ScholarshipSupport);
  })

  describe('dateAlertLevel', () => {
    it('should return green', () => {
      let checkDate = new Date();

      checkDate.setDate(today.getDate() + 1);
      expect(checkDate.getDate()).toBeGreaterThan(today.getDate());
      expect(scholarshipSupport.dateAlertLevel(checkDate)).toBe('red');

      checkDate.setDate(today.getDate() + 7);
      expect(checkDate.getDate()).toBeGreaterThan(today.getDate());
      expect(scholarshipSupport.dateAlertLevel(checkDate)).toBe('red');

      checkDate.setDate(today.getDate() + 8);
      expect(checkDate.getDate()).toBeGreaterThan(today.getDate());
      expect(scholarshipSupport.dateAlertLevel(checkDate)).toBe('yellow');
    })
  });

  function logDates(desc: string, refDate: Date, checkDate: Date) {
    let result = (refDate > checkDate) ? 'past' : 'future';
    console.log(`${desc} => refDate: ${scholarshipSupport.getSortDateOrHigh(refDate)} - check: ${scholarshipSupport.getSortDateOrHigh(checkDate)} - result: ${result}`);
  }
})
