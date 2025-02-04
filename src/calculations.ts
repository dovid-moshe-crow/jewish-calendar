/**
 * Core calculations for the Hebrew calendar
 */

const JEWISH_EPOCH = 347995.5; // Julian day number for 1 Tishrei 1 AM
const HOUR = 1080; // Parts in an hour (18 parts = 1 minute)
const DAY = 24 * HOUR; // Parts in a day
const MONTH = 29 * DAY + 12 * HOUR + 793; // Synodic month (29d 12h 44m 3.33s)

/**
 * Calculates if a Hebrew year is a leap year
 * @param year Hebrew year
 * @returns boolean
 */
export function isLeapYear(year: number): boolean {
  return (7 * year + 1) % 19 < 7;
}

/**
 * Calculates the number of months in a Hebrew year
 * @param year Hebrew year
 * @returns number of months (12 or 13)
 */
export function monthsInYear(year: number): number {
  return isLeapYear(year) ? 13 : 12;
}

/**
 * Calculates the molad (lunar conjunction) for a given year and month
 * @param year Hebrew year
 * @param month Month number (1 = Tishrei)
 * @returns Parts since the epoch
 */
export function calculateMolad(year: number, month: number): number {
  // Months since epoch
  const monthsElapsed =
    235 * Math.floor((year - 1) / 19) + // Months in complete 19 year cycles
    12 * ((year - 1) % 19) + // Regular months in this cycle
    Math.floor((((year - 1) % 19) * 7) / 19) + // Leap months in this cycle
    month -
    1; // Months in current year

  return JEWISH_EPOCH + monthsElapsed * MONTH;
}

/**
 * Determines if a given Hebrew date is valid
 * @param year Hebrew year
 * @param month Month number (1-13)
 * @param day Day of month (1-30)
 * @returns boolean
 */
export function isValidHebrewDate(
  year: number,
  month: number,
  day: number
): boolean {
  if (year < 1 || month < 1 || day < 1) return false;

  const isLeapYr = isLeapYear(year);
  const monthCount = monthsInYear(year);

  // Check month validity
  if (month > monthCount) return false;

  // Handle Adar in regular years
  if (!isLeapYr && month === 13) return false;

  // Handle month lengths
  const monthLength = getMonthLength(year, month);
  if (day > monthLength) return false;

  return true;
}

/**
 * Gets the length of a Hebrew month
 * @param year Hebrew year
 * @param month Month number (1-13)
 * @returns number of days in the month (29 or 30)
 */
export function getMonthLength(year: number, month: number): number {
  // Regular pattern of month lengths
  const regularMonths: Record<number, number> = {
    [HEBREW_MONTHS.NISAN]: 30,
    [HEBREW_MONTHS.IYAR]: 29,
    [HEBREW_MONTHS.SIVAN]: 30,
    [HEBREW_MONTHS.TAMMUZ]: 29,
    [HEBREW_MONTHS.AV]: 30,
    [HEBREW_MONTHS.ELUL]: 29,
    [HEBREW_MONTHS.TISHREI]: 30,
    [HEBREW_MONTHS.CHESHVAN]: 29, // Can be 30 in a complete year
    [HEBREW_MONTHS.KISLEV]: 30, // Can be 29 in a deficient year
    [HEBREW_MONTHS.TEVET]: 29,
    [HEBREW_MONTHS.SHEVAT]: 30,
    [HEBREW_MONTHS.ADAR_I]: 30, // Only in leap years
    [HEBREW_MONTHS.ADAR_II]: 29, // Regular Adar in non-leap years
  };

  // TODO: Implement variable month length for Cheshvan and Kislev based on year type
  return regularMonths[month] || 30;
}

/**
 * Calculates the Julian day number for a Hebrew date
 * @param year Hebrew year
 * @param month Month number (1-13)
 * @param day Day of month (1-30)
 * @returns Julian day number
 */
export function hebrewToJulian(
  year: number,
  month: number,
  day: number
): number {
  // TODO: Implement conversion logic
  return 0;
}

/**
 * Converts Julian day number to Hebrew date
 * @param jdn Julian day number
 * @returns [year, month, day]
 */
export function julianToHebrew(jdn: number): [number, number, number] {
  // TODO: Implement conversion logic
  return [5784, 1, 1];
}

/**
 * Calculates sunrise/sunset times
 * @param latitude Degrees
 * @param longitude Degrees
 * @param elevation Meters
 * @param date Date to calculate for
 * @returns [sunrise, sunset] in UTC
 */
export function calculateSunTimes(
  latitude: number,
  longitude: number,
  elevation: number,
  date: Date
): [Date, Date] {
  // TODO: Implement astronomical calculations
  return [new Date(), new Date()];
}

/**
 * Gets the name of a Hebrew month, handling Adar months specially
 * @param month Month number (1-13)
 * @param year Hebrew year (needed to check if leap year)
 * @param language 'en' or 'he'
 * @returns The month name
 */
export function getMonthName(
  month: number,
  year: number,
  language: 'en' | 'he'
): string {
  const isLeapYr = isLeapYear(year);

  // Handle special case for Adar in non-leap years
  if (!isLeapYr && month === HEBREW_MONTHS.ADAR_II) {
    return language === 'en' ? 'Adar' : 'אדר';
  }

  const names = HEBREW_MONTH_NAMES[language];
  return names[month - 1];
}

export const HEBREW_MONTHS = {
  NISAN: 1,
  IYAR: 2,
  SIVAN: 3,
  TAMMUZ: 4,
  AV: 5,
  ELUL: 6,
  TISHREI: 7,
  CHESHVAN: 8,
  KISLEV: 9,
  TEVET: 10,
  SHEVAT: 11,
  ADAR_I: 12, // Adar Aleph in leap years
  ADAR_II: 13, // Adar Bet in leap years (regular Adar in non-leap years)
} as const;

export const HEBREW_MONTH_NAMES = {
  en: [
    'Nisan',
    'Iyar',
    'Sivan',
    'Tammuz',
    'Av',
    'Elul',
    'Tishrei',
    'Cheshvan',
    'Kislev',
    'Tevet',
    'Shevat',
    'Adar I',
    'Adar II',
  ],
  he: [
    'ניסן',
    'אייר',
    'סיון',
    'תמוז',
    'אב',
    'אלול',
    'תשרי',
    'חשון',
    'כסלו',
    'טבת',
    'שבט',
    'אדר א',
    'אדר ב',
  ],
};
