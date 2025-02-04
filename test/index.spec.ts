import { HebrewDate, Zmanim, Parshah, HEBREW_MONTHS } from '../src';

describe('HebrewDate', () => {
  describe('constructor', () => {
    test('should create a valid HebrewDate object', () => {
      const hebrewDate = new HebrewDate({ year: 5784, month: 1, day: 1 });
      expect(hebrewDate).toBeDefined();
    });

    test('should throw error for invalid date', () => {
      expect(() => {
        new HebrewDate({ year: 5784, month: 14, day: 1 });
      }).toThrow('Invalid Hebrew date');
    });
  });

  describe('fromGregorian', () => {
    test('should convert Rosh Hashana 5784', () => {
      const gregorianDate = new Date(2023, 8, 15);
      const hebrewDate = HebrewDate.fromGregorian(gregorianDate);
      expect(hebrewDate).toEqual(
        expect.objectContaining({
          year: 5784,
          month: HEBREW_MONTHS.TISHREI,
          day: 1,
        })
      );
    });

    test('should convert Pesach 5784', () => {
      const gregorianDate = new Date(2024, 3, 22);
      const hebrewDate = HebrewDate.fromGregorian(gregorianDate);
      expect(hebrewDate).toEqual(
        expect.objectContaining({
          year: 5784,
          month: HEBREW_MONTHS.NISAN,
          day: 15,
        })
      );
    });
  });

  describe('toGregorian', () => {
    test('should convert Hebrew date to Gregorian', () => {
      const hebrewDate = new HebrewDate({
        year: 5784,
        month: HEBREW_MONTHS.TISHREI,
        day: 1,
      });
      const gregorianDate = hebrewDate.toGregorian();
      expect(gregorianDate).toEqual(new Date(2023, 8, 15)); // September 15, 2023
    });
  });

  describe('toString', () => {
    const hebrewDate = new HebrewDate({
      year: 5784,
      month: HEBREW_MONTHS.NISAN,
      day: 15,
    });

    test('should format date in English', () => {
      expect(hebrewDate.toString('ENGLISH')).toBe('15 Nisan 5784');
    });

    test('should format date in full English', () => {
      expect(hebrewDate.toString('FULL_ENGLISH')).toBe('15 of Nisan, 5784');
    });

    test('should format date in Hebrew', () => {
      expect(hebrewDate.toString('HEBREW')).toBe('15 ניסן 5784');
    });
  });

  describe('utility methods', () => {
    const hebrewDate = new HebrewDate({ year: 5784, month: 1, day: 1 });

    test('isLeapYear should work correctly', () => {
      expect(hebrewDate.isLeapYear()).toBe(true);
    });

    test('getMonthsInYear should return correct count', () => {
      expect(hebrewDate.getMonthsInYear()).toBe(13);
    });

    test('getMolad should return a Date object', () => {
      expect(hebrewDate.getMolad()).toBeInstanceOf(Date);
    });
  });
});

describe('Zmanim', () => {
  const location = {
    latitude: 31.7767,
    longitude: 35.2345,
    elevation: 754,
    timeZone: 'Asia/Jerusalem',
  };

  const zmanim = new Zmanim(location);

  test('should calculate sunrise', () => {
    expect(zmanim.getSunrise()).toBeInstanceOf(Date);
  });

  test('should calculate sunset', () => {
    expect(zmanim.getSunset()).toBeInstanceOf(Date);
  });

  test('should calculate candle lighting time', () => {
    const candleLighting = zmanim.getCandleLighting();
    expect(candleLighting).toBeInstanceOf(Date);

    const sunset = zmanim.getSunset();
    expect(candleLighting.getTime()).toBeLessThan(sunset.getTime());
  });

  test('should calculate havdalah time', () => {
    const havdalah = zmanim.getHavdalah();
    expect(havdalah).toBeInstanceOf(Date);

    const sunset = zmanim.getSunset();
    expect(havdalah.getTime()).toBeGreaterThan(sunset.getTime());
  });
});

describe('Parshah', () => {
  const hebrewDate = new HebrewDate({
    year: 5784,
    month: HEBREW_MONTHS.TISHREI,
    day: 1,
  });

  test('should get current parshah', () => {
    const parshah = Parshah.getParshah(hebrewDate);
    expect(parshah).toEqual({
      name: 'Bereishit',
      hebrewName: 'בראשית',
      isSpecial: false,
    });
  });

  test('should get next parshah', () => {
    const nextParshah = Parshah.getNextParshah(hebrewDate);
    expect(nextParshah).toEqual({
      name: 'Noach',
      hebrewName: 'נח',
      isSpecial: false,
    });
  });
});
