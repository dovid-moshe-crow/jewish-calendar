const HOUR = 1080;
const DAY = HOUR * 24;
const MONTH = 29 * DAY + 12 * HOUR + 793;

export class Molad {
  private days: number;
  private hours: number;
  private parts: number;

  constructor(days: number, hours: number, parts: number) {
    this.days = days;
    this.hours = hours;
    this.parts = parts;
  }

  static firstMolad() {
    return new Molad(2, 5, 204);
  }

  multiply(months: number) {
    this.days = this.days * months;
    this.hours = this.hours * months;
    this.parts = this.parts * months;

    this.hours += Math.floor(this.parts / HOUR);
    this.parts = this.parts % HOUR;

    this.days += Math.floor(this.hours / 24);
    this.hours = this.hours % 24;
  }
}
