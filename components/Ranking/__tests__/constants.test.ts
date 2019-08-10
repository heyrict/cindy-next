import { getMonthlyDate } from '../constants';

const firstHalf = new Date('2019-03-05T03:01:43Z');
const secondHalf = new Date('2019-02-25T03:01:43Z');

const expectedStart = new Date(2019, 0, 1);
const expectedEnd = new Date(2019, 1, 1);

describe('getMonthlyDate()', () => {
  it('date in firstHalf should work', () => {
    const [start, end] = getMonthlyDate(firstHalf);
    expect(new Date(start)).toEqual(expectedStart);
    expect(new Date(end)).toEqual(expectedEnd);
  });

  it('date in secondHalf should work', () => {
    const [start, end] = getMonthlyDate(secondHalf);
    expect(new Date(start)).toEqual(expectedStart);
    expect(new Date(end)).toEqual(expectedEnd);
  });
});
