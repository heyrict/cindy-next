import { getRankingDate } from '../constants';

const firstHalf = new Date('2019-03-05T03:01:43Z');
const secondHalf = new Date('2019-02-25T03:01:43Z');

const expectedResult = {
  year: 2019,
  month: 0, // January
};

describe('getRankingDate()', () => {
  it('date in firstHalf should work', () => {
    const { year, month } = getRankingDate(firstHalf);
    expect(year).toEqual(expectedResult.year);
    expect(month).toEqual(expectedResult.month);
  });

  it('date in secondHalf should work', () => {
    const { year, month } = getRankingDate(secondHalf);
    expect(year).toEqual(expectedResult.year);
    expect(month).toEqual(expectedResult.month);
  });

  it('date in January should work', () => {
    const date = new Date('2019-01-02T00:00:00Z');
    const expectedYear = 2018;
    const expectedMonth = 10;
    const { year, month } = getRankingDate(date);
    expect(year).toEqual(expectedYear);
    expect(month).toEqual(expectedMonth);
  });
});
