import {
  getKeywords,
  counter,
  setNodeInChildren,
  constructTree,
} from '../common';

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
    const expected = {
      も: 8,
      す: 1,
    };
    const result = await counter(example);
    expect(result).toStrictEqual(expected);
  });
});

describe('Test setNodeInChildren', () => {
  let tree;
  beforeEach(() => {
    tree = {
      name: 'Root',
      children: [],
    };
  });

  it('One flat array', () => {
    const example = ['a', 'b', 'c'];
    const expected = {
      name: 'Root',
      children: [
        {
          name: 'a',
          children: [
            {
              name: 'b',
              children: [
                {
                  name: 'c',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
    setNodeInChildren(example, tree);
    expect(tree).toStrictEqual(expected);
  });

  it('Multiple array', () => {
    const exampleA = ['a', 'b', 'c'];
    const exampleB = ['a', 'd'];
    const exampleC = ['e'];
    const expected = {
      name: 'Root',
      children: [
        {
          name: 'a',
          children: [
            {
              name: 'b',
              children: [
                {
                  name: 'c',
                  children: [],
                },
              ],
            },
            {
              name: 'd',
              children: [],
            },
          ],
        },
        {
          name: 'e',
          children: [],
        },
      ],
    };
    setNodeInChildren(exampleA, tree);
    setNodeInChildren(exampleB, tree);
    setNodeInChildren(exampleC, tree);
    expect(tree).toStrictEqual(expected);
  });
});

describe('Test constructTree', () => {
  it('Multiple arrays', () => {
    const example = [
      {
        keywords: ['a', 'b', 'c'],
      },
      { keywords: ['a', 'd'] },
      { keywords: ['e'] },
    ];
    const expected = {
      name: 'Root',
      children: [
        {
          name: 'a',
          children: [
            {
              name: 'b',
              children: [
                {
                  name: 'c',
                  children: [],
                },
              ],
            },
            {
              name: 'd',
              children: [],
            },
          ],
        },
        {
          name: 'e',
          children: [],
        },
      ],
    };
    expect(constructTree(example)).toStrictEqual(expected);
  });
});
