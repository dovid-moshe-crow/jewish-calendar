const HOUR = 1080;
const DAY = HOUR * 24;
const MONTH = 29 * DAY + 12 * HOUR + 793;

export class Molad {
  private day: number;
  private hour: number;
  private parts: number;

  constructor(day: number, hour: number, parts: number) {
    this.day = day;
    this.hour = hour;
    this.parts = parts;
  }

  static firstMolad() {
    return new Molad(2, 5, 204);
  }

  multiply(months: number) {
    this.day = this.day * months;
    this.hour = this.hour * months;
    this.parts = this.parts * months;

    this.hour += Math.floor(this.parts / HOUR);
    this.parts = this.parts % HOUR;

    this.day += Math.floor(this.hour / 24);
    this.hour = this.hour % 24;

    this.day = this.day % 7;

    if (this.day === 0) {
      this.day = 7;
    }

    return this;
  }

  addDay() {
    this.day += 1;

    if (this.day === 0) {
      this.day = 7;
    }

    return this;
  }

  getDay() {
    return this.day;
  }

  getHour() {
    return this.hour;
  }

  toString() {
    return `${this.day} ${this.hour}:${this.parts}`;
  }
}
