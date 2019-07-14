import {
  getKeywords,
  counter,
  setNodeInChildren,
  constructTree,
} from '../common';
import { KeywordTreeNodeType } from '../types';
import { ReplayKeywordType } from 'reducers/types';

describe('Test tokenizer', () => {
  it('works', async () => {
    const expected = ['すもも', 'もも', 'もも', 'うち'];
    const result = await getKeywords('すもももももももものうち');
    expect(result).toStrictEqual(expected);
  });
});

describe('Test counter', () => {
  it('works', async () => {
    const example = Array.from('すもももももももも').map(name => ({
      name,
    })) as Array<ReplayKeywordType>;
    const expected = {
      も: 8,
      す: 1,
    };
    const result = counter(example);
    expect(result).toStrictEqual(expected);
  });
});

describe('Test setNodeInChildren', () => {
  let tree: { name: string; children: KeywordTreeNodeType[] };
  beforeEach(() => {
    tree = {
      name: 'Root',
      children: [],
    };
  });

  it('One flat array', () => {
    const example = ['a', 'b', 'c'].map(name => ({ name })) as Array<
      ReplayKeywordType
    >;
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
    const exampleA = ['a', 'b', 'c'].map(name => ({ name })) as Array<
      ReplayKeywordType
    >;
    const exampleB = ['a', 'd'].map(name => ({ name })) as Array<
      ReplayKeywordType
    >;
    const exampleC = ['e'].map(name => ({ name })) as Array<ReplayKeywordType>;
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
        id: 1,
        question: 'any.1',
        question_keywords: ['a', 'b', 'c'].map(name => ({ name })) as Array<
          ReplayKeywordType
        >,
      },
      {
        id: 2,
        question: 'any.2',
        question_keywords: ['a', 'd'].map(name => ({ name })) as Array<
          ReplayKeywordType
        >,
      },
      {
        id: 3,
        question: 'any.3',
        question_keywords: ['e'].map(name => ({ name })) as Array<
          ReplayKeywordType
        >,
      },
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
