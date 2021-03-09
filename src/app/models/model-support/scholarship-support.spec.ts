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

  describe('dateAlertLevel with date objects', () => {
    it('should return correct alert level string', () => {
      let checkDate = new Date();

      checkDate.setDate(today.getDate() - 1);
      expectAlertLevel(checkDate, 'red');

      checkDate.setDate(today.getDate());
      expectAlertLevel(checkDate, 'red');

      checkDate.setDate(today.getDate() + 1);
      expectAlertLevel(checkDate, 'orange');

      checkDate.setDate(today.getDate() + 7);
      expectAlertLevel(checkDate, 'orange');

      checkDate.setDate(today.getDate() + 8);
      expectAlertLevel(checkDate, 'yellow');

      checkDate.setDate(today.getDate() + 24);
      expectAlertLevel(checkDate, 'yellow');

      checkDate.setDate(today.getDate() + 25);
      expectAlertLevel(checkDate, 'green');
    })
  });

  function expectAlertLevel(checkDate: Date, expectedAlertLevel: string) {
    expect(scholarshipSupport.alertLevelFromDate(checkDate)).toBe(expectedAlertLevel);

    const checkDateString = scholarshipSupport.getSortDateOrHigh(checkDate);
    expect(scholarshipSupport.alertLevelFromDateString(checkDateString)).toBe(expectedAlertLevel);
  }
})