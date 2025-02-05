export class JewishDate {
  private year: number;
  private month: number;
  private day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static fromGregorian(date: Date) {
    throw new Error('Not implemented');
  }

  toGregorian() {
    throw new Error('Not implemented');
  }

  toString() {
    throw new Error('Not implemented');
  }
}
