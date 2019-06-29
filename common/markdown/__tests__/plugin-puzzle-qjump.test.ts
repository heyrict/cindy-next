import { normPuzzleQjump } from '../plugin-puzzle-qjump';

const testSet = [
  {
    data: '12 test 12',
    expected: '[12](#Q12) test 12',
  },
  {
    data: 'Q12, Q13, Ｑ14 test > KaitouQ20',
    expected: '[Q12](#Q12), [Q13](#Q13), [Ｑ14](#Q14) test > KaitouQ20',
  },
  {
    data: 'Ｑ14: test',
    expected: '[Ｑ14](#Q14): test',
  },
  {
    data: '13, Refer to Q12',
    expected: '[13](#Q13), Refer to [Q12](#Q12)',
  },
  {
    data: 'Q16: Q18,Q19とＱ20参照たれ',
    expected: '[Q16](#Q16): [Q18](#Q18),[Q19](#Q19)と[Ｑ20](#Q20)参照たれ',
  },
  {
    data: '[Q16](#Q16): [Q18](#Q18),[Q19](#Q19)と[Ｑ20](#Q20)参照たれ',
    expected: '[Q16](#Q16): [Q18](#Q18),[Q19](#Q19)と[Ｑ20](#Q20)参照たれ',
  },
];

describe('normPuzzleQjump()', () => {
  it.each`
    data               | expected
    ${testSet[0].data} | ${testSet[0].expected}
    ${testSet[1].data} | ${testSet[1].expected}
    ${testSet[2].data} | ${testSet[2].expected}
    ${testSet[3].data} | ${testSet[3].expected}
    ${testSet[4].data} | ${testSet[4].expected}
    ${testSet[5].data} | ${testSet[5].expected}
  `('Expect output of "$data" to be "$expected"', ({ data, expected }) => {
    expect(normPuzzleQjump(data)).toEqual(expected);
  });
});
