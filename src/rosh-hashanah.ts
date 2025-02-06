import { JewishDate } from './jewish-date';
import { Molad } from './molad';
import { RoshChodesh } from './rosh-chodesh';

export class RoshHashanah extends RoshChodesh {
  constructor(year: number) {
    super(year, 1);
  }

  getWeekDay() {
    let day = this.molad.getDay();

    if (this.molad.getHour() >= 18) {
      day++;
    }

    if (day === 1 || day === 4 || day === 6) {
      day++;
    }

    return day;
  }
}
