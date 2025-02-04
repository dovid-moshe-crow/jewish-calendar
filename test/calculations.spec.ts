import {
  isLeapYear,
  monthsInYear,
  calculateMolad,
  isValidHebrewDate,
  hebrewToJulian,
  julianToHebrew,
  getMonthLength,
  getMonthName,
  HEBREW_MONTHS,
  HEBREW_MONTH_NAMES,
} from '../src/calculations';

describe('Hebrew Calendar Calculations', () => {
  describe('isLeapYear', () => {
    const leapYears = [5784, 5786, 5789, 5792, 5795];
    const nonLeapYears = [5783, 5785, 5787, 5788, 5790, 5791];

    test.each(leapYears)('year %i should be a leap year', year => {
      expect(isLeapYear(year)).toBe(true);
    });

    test.each(nonLeapYears)('year %i should not be a leap year', year => {
      expect(isLeapYear(year)).toBe(false);
    });
  });

  describe('monthsInYear', () => {
    test('should return 13 for leap years', () => {
      expect(monthsInYear(5784)).toBe(13);
    });

    test('should return 12 for regular years', () => {
      expect(monthsInYear(5785)).toBe(12);
    });
  });

  describe('calculateMolad', () => {
    test('should calculate molad for known dates', () => {
      // Test with known molad values
      const molad5784Tishrei = calculateMolad(5784, HEBREW_MONTHS.TISHREI);
      expect(molad5784Tishrei).toBeGreaterThan(0);
    });
  });

  describe('isValidHebrewDate', () => {
    const validDates = [
      [5784, HEBREW_MONTHS.NISAN, 1], // First of Nisan
      [5784, HEBREW_MONTHS.TISHREI, 1], // First of Tishrei
      [5784, HEBREW_MONTHS.ADAR_I, 30], // Last of Adar I in leap year
      [5784, HEBREW_MONTHS.ADAR_II, 29], // Last of Adar II in leap year
      [5785, HEBREW_MONTHS.ADAR_II, 29], // Last of regular Adar in non-leap year
    ];

    const invalidDates = [
      [0, 1, 1], // Invalid year
      [5784, 0, 1], // Invalid month
      [5784, 14, 1], // Month > 13
      [5784, 1, 0], // Invalid day
      [5784, 1, 31], // Day > 30
      [5785, HEBREW_MONTHS.ADAR_I, 1], // Adar I in non-leap year
      [5784, HEBREW_MONTHS.ADAR_II, 30], // Invalid day in Adar II
      [5784, HEBREW_MONTHS.IYAR, 30], // Invalid day in Iyar (29 days)
    ];

    test.each(validDates)(
      'year %i month %i day %i should be valid',
      (year, month, day) => {
        expect(isValidHebrewDate(year, month, day)).toBe(true);
      }
    );

    test.each(invalidDates)(
      'year %i month %i day %i should be invalid',
      (year, month, day) => {
        expect(isValidHebrewDate(year, month, day)).toBe(false);
      }
    );
  });

  describe('Hebrew/Julian conversion', () => {
    const testCases = [
      // [hebrew_year, hebrew_month, hebrew_day, julian_day_number]
      [5784, HEBREW_MONTHS.TISHREI, 1, 2460218], // Rosh Hashana 5784
      [5784, HEBREW_MONTHS.NISAN, 15, 2460409], // Pesach 5784
    ];

    test.each(testCases)(
      'should convert between Hebrew date (%i-%i-%i) and Julian day number %i',
      (year, month, day, jdn) => {
        expect(hebrewToJulian(year, month, day)).toBe(jdn);
        expect(julianToHebrew(jdn)).toEqual([year, month, day]);
      }
    );
  });

  describe('HEBREW_MONTHS', () => {
    test('should have correct month numbers', () => {
      expect(HEBREW_MONTHS.NISAN).toBe(1);
      expect(HEBREW_MONTHS.TISHREI).toBe(7);
      expect(HEBREW_MONTHS.ADAR_I).toBe(12);
      expect(HEBREW_MONTHS.ADAR_II).toBe(13);
    });
  });

  describe('HEBREW_MONTH_NAMES', () => {
    test('should have correct English names for Adar months', () => {
      expect(HEBREW_MONTH_NAMES.en[HEBREW_MONTHS.ADAR_I - 1]).toBe('Adar I');
      expect(HEBREW_MONTH_NAMES.en[HEBREW_MONTHS.ADAR_II - 1]).toBe('Adar II');
    });

    test('should have correct Hebrew names for Adar months', () => {
      expect(HEBREW_MONTH_NAMES.he[HEBREW_MONTHS.ADAR_I - 1]).toBe('אדר א');
      expect(HEBREW_MONTH_NAMES.he[HEBREW_MONTHS.ADAR_II - 1]).toBe('אדר ב');
    });
  });

  describe('getMonthLength', () => {
    test('should return correct lengths for fixed-length months', () => {
      expect(getMonthLength(5784, HEBREW_MONTHS.NISAN)).toBe(30);
      expect(getMonthLength(5784, HEBREW_MONTHS.IYAR)).toBe(29);
      expect(getMonthLength(5784, HEBREW_MONTHS.SIVAN)).toBe(30);
    });

    test('should handle Adar I and II correctly in leap years', () => {
      // 5784 is a leap year
      expect(getMonthLength(5784, HEBREW_MONTHS.ADAR_I)).toBe(30);
      expect(getMonthLength(5784, HEBREW_MONTHS.ADAR_II)).toBe(29);
    });

    test('should handle regular Adar in non-leap years', () => {
      // 5785 is not a leap year
      expect(getMonthLength(5785, HEBREW_MONTHS.ADAR_II)).toBe(29);
    });
  });

  describe('getMonthName', () => {
    describe('in leap year (5784)', () => {
      test('should return correct English names', () => {
        expect(getMonthName(HEBREW_MONTHS.ADAR_I, 5784, 'en')).toBe('Adar I');
        expect(getMonthName(HEBREW_MONTHS.ADAR_II, 5784, 'en')).toBe('Adar II');
      });

      test('should return correct Hebrew names', () => {
        expect(getMonthName(HEBREW_MONTHS.ADAR_I, 5784, 'he')).toBe('אדר א');
        expect(getMonthName(HEBREW_MONTHS.ADAR_II, 5784, 'he')).toBe('אדר ב');
      });
    });

    describe('in regular year (5785)', () => {
      test('should return correct English names', () => {
        expect(getMonthName(HEBREW_MONTHS.ADAR_II, 5785, 'en')).toBe('Adar');
      });

      test('should return correct Hebrew names', () => {
        expect(getMonthName(HEBREW_MONTHS.ADAR_II, 5785, 'he')).toBe('אדר');
      });
    });

    test('should return regular month names correctly', () => {
      expect(getMonthName(HEBREW_MONTHS.NISAN, 5784, 'en')).toBe('Nisan');
      expect(getMonthName(HEBREW_MONTHS.TISHREI, 5784, 'he')).toBe('תשרי');
    });
  });
});
