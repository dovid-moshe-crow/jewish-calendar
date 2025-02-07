const HOUR = 1080;
const AVG_MONTH = { days: 29, hours: 12, parts: 793 };

export class Molad {
  private day: number;
  private hour: number;
  private parts: number;

  constructor(months: number) {
    this.day = AVG_MONTH.days * months;
    this.hour = AVG_MONTH.hours * months;
    this.parts = AVG_MONTH.parts * months;

    this.addMolad(2, 5, 204); // add molad of creation (molad tohu)
    this.normalize();
  }

  private addMolad(day: number, hour: number, parts: number) {
    this.day += day;
    this.hour += hour;
    this.parts += parts;
  }

  private normalize() {
    this.hour += Math.floor(this.parts / HOUR);
    this.parts = this.parts % HOUR;

    this.day += Math.floor(this.hour / 24);
    this.hour = this.hour % 24;

    this.day = this.day % 7;

    if (this.day === 0) {
      this.day = 7;
    }
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
