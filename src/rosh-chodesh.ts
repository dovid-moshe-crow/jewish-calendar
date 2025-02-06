import { Molad } from './molad';

export class RoshChodesh {
  private year: number;
  private month: number;
  protected molad: Molad;

  constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
    this.molad = new Molad(this.monthsElapsedFromCreation());
  }

  private monthsElapsedFromCreation() {
    const commonMonths = (this.year - 1) * 12;
    const leapMonths =
      Math.floor((this.year - 1) / 19) * 7 + // Leap months in previous cycles
      Math.floor((((this.year - 1) % 19) * 7) / 19); // Leap months in this cycle

    return commonMonths + leapMonths + this.month;
  }

  getMolad() {
    return this.molad;
  }
}
