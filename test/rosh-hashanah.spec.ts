import { RoshHashanah } from '../src/rosh-hashanah';

describe('RoshHashanah', () => {
  test('should create a valid RoshHashanah object', () => {
    const roshHashanah = new RoshHashanah(5768);
    expect(roshHashanah).toBeDefined();
  });

  test('should return the correct week day for 5768', () => {
    const roshHashanah = new RoshHashanah(5768);
    expect(roshHashanah.getWeekDay()).toBe(5);
    expect(roshHashanah.getMolad().toString()).toBe('4 10:468');
  });
});
