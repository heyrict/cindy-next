import { getKeywords, counter } from '../common';

const questions = [
  {
    question: 'Did the man killed himself in the restaurant?',
  },
  {
    question: "Does the man's job count?",
  },
];

describe('Test tokenizer', () => {
  it('works', async () => {
    const expected = ['すもも', 'もも', 'もも', 'うち'];
    const result = await getKeywords('すもももももももものうち');
    expect(result).toStrictEqual(expected);
  });
});

describe('Test counter', () => {
  it('works', async () => {
    const example = Array.from('すもももももももも');
    const expected = [
      {
        key: 'も',
        value: 8,
      },
      {
        key: 'す',
        value: 1,
      },
    ];
    const result = await counter(example);
    expect(result).toStrictEqual(expected);
  });
});
