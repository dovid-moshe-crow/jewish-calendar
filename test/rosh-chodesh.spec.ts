import { RoshChodesh } from '../src/rosh-chodesh';

describe('RoshChodesh', () => {
  describe('constructor', () => {
    test('should create a valid RoshChodesh object', () => {
      const roshChodesh = new RoshChodesh(5784, 1);
      expect(roshChodesh).toBeDefined();
    });
  });

  describe('getWeekDay', () => {
    test('should return the correct week day for 5768', () => {
      const roshChodesh = new RoshChodesh(5768, 0);
      expect(roshChodesh.getMolad().toString()).toBe('4 10:468');
    });
  });
});
