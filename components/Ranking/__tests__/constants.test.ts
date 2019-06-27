import { getMonthlyDate } from '../constants';

const firstHalf = new Date('2019-03-05T03:01:43Z');
const secondHalf = new Date('2019-02-25T03:01:43Z');

const expectedStart = new Date('2019-01-01T00:00:00Z').toISOString();
const expectedEnd = new Date('2019-02-01T00:00:00Z').toISOString();

describe('getMonthlyDate()', () => {
  it('date in firstHalf should work', () => {
    const [start, end] = getMonthlyDate(firstHalf);
    expect(start).toEqual(expectedStart);
    expect(end).toEqual(expectedEnd);
  });

  it('date in secondHalf should work', () => {
    const [start, end] = getMonthlyDate(secondHalf);
    expect(start).toEqual(expectedStart);
    expect(end).toEqual(expectedEnd);
  });
});
