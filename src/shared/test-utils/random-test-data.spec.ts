import { randomTestData } from './random-test-data';

describe('Random test data', () => {
  const minNumber = 3;
  const maxNumber = 10;

  describe('pickNumberBetween', () => {
    it('should return number in range', () => {
      let pickedNumber = randomTestData.pickNumberBetween(minNumber, maxNumber);
      expect(minNumber <= pickedNumber && pickedNumber <= maxNumber).toBeTruthy();
    });

    it('should throw error when low number is greater than high number', () => {
      expect(() => randomTestData.pickNumberBetween(maxNumber, minNumber)).toThrow();
    });
  });

  describe('text functions', () => {
    it('should generate text strings', () => {
      expect(randomTestData.text().length).toBe(7);

      let length = randomTestData.pickNumberBetween(minNumber, maxNumber);
      expect(valueWithinRange(length)).toBeTruthy();
      expect(randomTestData.text(length).length).toBe(length);
    });

    it(`should return a list of ${minNumber} strings`, () => {
      let textList = randomTestData.textList(minNumber);
      expect(valueWithinRange(textList.length)).toBeTruthy();
      expect(listNotNullElements(textList)).toBeTruthy();
    });

    it(`should return a list of strings within a range`, () => {
      let textList = randomTestData.textListBetween(minNumber, maxNumber);
      expect(valueWithinRange(textList.length)).toBeTruthy();
      expect(listNotNullElements(textList)).toBeTruthy();
    });

    function listNotNullElements(checkList: any[]) {
      let count = 0;
      checkList.forEach(entry => {
        if (entry !== undefined) {
          count++;
        }
      });
      return count === checkList.length;
    }

    function valueWithinRange(checkValue: number) {
      return minNumber <= checkValue && checkValue <= maxNumber;
    }
  });
});
