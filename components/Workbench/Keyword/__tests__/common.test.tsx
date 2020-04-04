import { counter, setNodeInChildren, constructTree } from '../common';
import { KeywordTreeNodeType } from '../types';
import { ReplayKeywordType, ReplayDialogueType } from 'reducers/types';

const defaultDialogue: ReplayDialogueType = {
  id: -1,
  good: false,
  true: false,
  question: '',
  answer: '',
  question_keywords: [],
  milestones: [],
  dependency: '',
};

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
  let tree: KeywordTreeNodeType<number>;
  beforeEach(() => {
    tree = {
      name: 'Root',
      children: [],
      leaves: [],
    };
  });

  it('One flat array', () => {
    const example = ['a', 'b', 'c'].map(name => ({ name })) as Array<
      ReplayKeywordType
    >;
    const expected = {
      name: 'Root',
      leaves: [],
      children: [
        {
          name: 'a',
          leaves: [],
          children: [
            {
              name: 'b',
              leaves: [],
              children: [
                {
                  name: 'c',
                  leaves: [],
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
    setNodeInChildren(example, tree, null);
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
      leaves: [],
      children: [
        {
          name: 'a',
          leaves: [],
          children: [
            {
              name: 'b',
              leaves: [],
              children: [
                {
                  name: 'c',
                  leaves: [],
                  children: [],
                },
              ],
            },
            {
              name: 'd',
              leaves: [],
              children: [],
            },
          ],
        },
        {
          name: 'e',
          leaves: [],
          children: [],
        },
      ],
    };
    setNodeInChildren(exampleA, tree, null);
    setNodeInChildren(exampleB, tree, null);
    setNodeInChildren(exampleC, tree, null);
    expect(tree).toStrictEqual(expected);
  });
});

describe('Test constructTree', () => {
  const example = [
    {
      ...defaultDialogue,
      id: 1,
      question: 'any.1',
      question_keywords: ['a', 'b', 'c'].map(name => ({ name })) as Array<
        ReplayKeywordType
      >,
    },
    {
      ...defaultDialogue,
      id: 2,
      question: 'any.2',
      question_keywords: ['a', 'd'].map(name => ({ name })) as Array<
        ReplayKeywordType
      >,
    },
    {
      ...defaultDialogue,
      id: 3,
      question: 'any.3',
      question_keywords: ['e'].map(name => ({ name })) as Array<
        ReplayKeywordType
      >,
    },
    {
      ...defaultDialogue,
      id: 4,
      question: 'any.4',
      question_keywords: ['e'].map(name => ({ name })) as Array<
        ReplayKeywordType
      >,
    },
  ];

  const getLeaf = (dialogue: ReplayDialogueType) => ({
    id: dialogue.id,
    good: dialogue.good,
    true: dialogue.true,
    question: dialogue.question,
    answer: dialogue.answer,
    milestones: dialogue.milestones,
    dependency: dialogue.dependency,
  });

  it('Not add leaf', () => {
    const expected = {
      name: 'Root',
      leaves: [],
      children: [
        {
          name: 'a',
          leaves: [],
          children: [
            {
              name: 'b',
              leaves: [],
              children: [
                {
                  name: 'c',
                  leaves: [],
                  children: [],
                },
              ],
            },
            {
              name: 'd',
              leaves: [],
              children: [],
            },
          ],
        },
        {
          name: 'e',
          leaves: [],
          children: [],
        },
      ],
    };
    expect(constructTree(example)).toStrictEqual(expected);
  });

  it('Add leaf', () => {
    const expected = {
      name: 'Root',
      leaves: [],
      children: [
        {
          name: 'a',
          leaves: [],
          children: [
            {
              name: 'b',
              leaves: [],
              children: [
                {
                  name: 'c',
                  leaves: [getLeaf(example[0])],
                  children: [],
                },
              ],
            },
            {
              name: 'd',
              leaves: [getLeaf(example[1])],
              children: [],
            },
          ],
        },
        {
          name: 'e',
          leaves: [getLeaf(example[2]), getLeaf(example[3])],
          children: [],
        },
      ],
    };
    expect(
      constructTree(example, d => d.question_keywords, true),
    ).toStrictEqual(expected);
  });
});
