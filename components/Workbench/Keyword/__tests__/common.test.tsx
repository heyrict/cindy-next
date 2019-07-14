import {
  getKeywords,
  counter,
  setNodeInChildren,
  constructTree,
} from '../common';
import { KeywordTreeNodeType } from '../types';

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
  let tree: { name: string; children: KeywordTreeNodeType[] };
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
        question: 'any.1',
        question_keywords: ['a', 'b', 'c'],
      },
      { question: 'any.2', question_keywords: ['a', 'd'] },
      { question: 'any.3', question_keywords: ['e'] },
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
