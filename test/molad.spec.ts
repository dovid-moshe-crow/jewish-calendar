import { Molad } from '../src/molad';

describe('Molad', () => {
  describe('multiply', () => {
    test('should get the the molad of ', () => {
      const molad = new Molad(71328);

      expect(molad.toString()).toBe('4 10:468');
    });
  });
});
