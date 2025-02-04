import { HebrewDate } from '../src';

describe('HebrewDate', () => {
  it('should create a HebrewDate object', () => {
    const hebrewDate = new HebrewDate({ year: 5785, month: 1, day: 1 });
    expect(hebrewDate).toBeDefined();
  });
});
