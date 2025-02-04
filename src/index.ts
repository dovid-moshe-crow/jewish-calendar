import {
  HebrewDateOptions,
  ZmanimOptions,
  Holiday,
  DateFormat,
  ParshahInfo,
} from './types';

import {
  isLeapYear,
  monthsInYear,
  calculateMolad,
  isValidHebrewDate,
  hebrewToJulian,
  julianToHebrew,
  calculateSunTimes,
  getMonthName,
  HEBREW_MONTHS,
  HEBREW_MONTH_NAMES,
} from './calculations';

export class HebrewDate {
  private year: number;
  private month: number;
  private day: number;

  constructor(options: HebrewDateOptions) {
    if (!isValidHebrewDate(options.year, options.month, options.day)) {
      throw new Error('Invalid Hebrew date');
    }
    this.year = options.year;
    this.month = options.month;
    this.day = options.day;
  }

  static fromGregorian(date: Date): HebrewDate {
    // Convert Gregorian date to Julian day number
    const jdn = gregorianToJulian(date);
    // Convert Julian day number to Hebrew date
    const [year, month, day] = julianToHebrew(jdn);
    return new HebrewDate({ year, month, day });
  }

  toGregorian(): Date {
    // Convert Hebrew date to Julian day number
    const jdn = hebrewToJulian(this.year, this.month, this.day);
    // Convert Julian day number to Gregorian date
    return julianToGregorian(jdn);
  }

  toString(format: DateFormat = 'ENGLISH'): string {
    const language = format.includes('HEBREW') ? 'he' : 'en';
    const monthName = getMonthName(this.month, this.year, language);

    if (format === 'FULL_HEBREW') {
      // TODO: Implement Hebrew numerals for day and year
      return `${this.day} ${monthName} ${this.year}`;
    } else if (format === 'FULL_ENGLISH') {
      return `${this.day} of ${monthName}, ${this.year}`;
    } else {
      return `${this.day} ${monthName} ${this.year}`;
    }
  }

  isLeapYear(): boolean {
    return isLeapYear(this.year);
  }

  getMonthsInYear(): number {
    return monthsInYear(this.year);
  }

  getMolad(): Date {
    const parts = calculateMolad(this.year, this.month);
    // TODO: Convert parts to Date object
    return new Date();
  }
}

// Helper functions for Julian Day Number conversions
function gregorianToJulian(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let jdn = Math.floor(
    (1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4
  );
  jdn += Math.floor(
    (367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12
  );
  jdn -= Math.floor(
    (3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100)) / 4
  );
  jdn += day - 32075;

  return jdn;
}

function julianToGregorian(jdn: number): Date {
  const j = jdn + 32044;
  const g = Math.floor(j / 146097);
  const dg = j % 146097;
  const c = Math.floor(((Math.floor(dg / 36524) + 1) * 3) / 4);
  const dc = dg - c * 36524;
  const b = Math.floor(dc / 1461);
  const db = dc % 1461;
  const a = Math.floor(((Math.floor(db / 365) + 1) * 3) / 4);
  const da = db - a * 365;
  const y = g * 400 + c * 100 + b * 4 + a;
  const m = Math.floor(Math.floor(da * 5 + 308) / 153 - 2);
  const d = da - Math.floor(((m + 4) * 153) / 5) + 122;

  const year = y - 4800 + Math.floor((m + 2) / 12);
  const month = ((m + 2) % 12) + 1;
  const day = d + 1;

  return new Date(year, month - 1, day);
}

export class Zmanim {
  private latitude: number;
  private longitude: number;
  private elevation: number;
  private timeZone: string;

  constructor(options: ZmanimOptions) {
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    this.elevation = options.elevation;
    this.timeZone = options.timeZone;
  }

  getSunrise(): Date {
    const [sunrise] = calculateSunTimes(
      this.latitude,
      this.longitude,
      this.elevation,
      new Date()
    );
    return sunrise;
  }

  getSunset(): Date {
    const [, sunset] = calculateSunTimes(
      this.latitude,
      this.longitude,
      this.elevation,
      new Date()
    );
    return sunset;
  }

  getCandleLighting(minutesBeforeSunset = 18): Date {
    const sunset = this.getSunset();
    return new Date(sunset.getTime() - minutesBeforeSunset * 60000);
  }

  getHavdalah(minutesAfterSunset = 42): Date {
    const sunset = this.getSunset();
    return new Date(sunset.getTime() + minutesAfterSunset * 60000);
  }
}

export class Parshah {
  static getParshah(date: HebrewDate): ParshahInfo {
    // TODO: Implement parshah calculation
    return {
      name: 'Bereishit',
      hebrewName: 'בראשית',
      isSpecial: false,
    };
  }

  static getNextParshah(date: HebrewDate): ParshahInfo {
    // TODO: Implement next parshah calculation
    return {
      name: 'Noach',
      hebrewName: 'נח',
      isSpecial: false,
    };
  }
}

// Re-export types and constants
export * from './types';
export { HEBREW_MONTHS, HEBREW_MONTH_NAMES } from './calculations';
