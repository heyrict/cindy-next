export const users = {
  foo: {
    id: 73,
    nickname: 'Foo',
    username: 'Foo',
    sui_hei_current_useraward: null,
    __typename: 'sui_hei_user',
  },
  bar: {
    id: 13,
    nickname: 'Bar',
    username: 'Bar',
    sui_hei_current_useraward: null,
    __typename: 'sui_hei_user',
  },
  carrot: {
    id: 621,
    nickname: 'Carrot',
    username: 'last_scene',
    sui_hei_current_useraward: null,
    __typename: 'sui_hei_user',
  },
};

export const dialogues = [
  {
    id: 106338,
    good: false,
    true: false,
    question: 'Question by Foo',
    questionEditTimes: 0,
    answer: 'Answer Foo',
    answerEditTimes: 0,
    created: '2019-06-17T12:51:56.774611+00:00',
    answeredtime: '2019-06-17T12:53:40.056463+00:00',
    sui_hei_user: users.foo,
    __typename: 'sui_hei_dialogue',
  },
  {
    id: 106339,
    good: false,
    true: false,
    question: 'Question by Bar',
    questionEditTimes: 0,
    answer: 'Answer by Bar',
    answerEditTimes: 1,
    created: '2019-06-17T12:54:56.634567+00:00',
    answeredtime: '2019-06-17T12:55:56.464007+00:00',
    sui_hei_user: users.bar,
    __typename: 'sui_hei_dialogue',
  },
  {
    id: 106340,
    good: false,
    true: false,
    question: 'Question 2 by Foo',
    questionEditTimes: 0,
    answer: 'Answer 2 by Foo',
    answerEditTimes: 0,
    created: '2019-06-17T12:56:43.204862+00:00',
    answeredtime: '2019-06-17T12:57:24.681986+00:00',
    sui_hei_user: users.foo,
    __typename: 'sui_hei_dialogue',
  },
];

export const hints = [
  {
    id: 2845,
    content: 'General hint',
    created: '2019-06-17T13:12:37.900021+00:00',
    receiver: null,
    __typename: 'sui_hei_hint',
  },
  {
    id: 2848,
    content: 'Hint to Foo',
    created: '2019-06-17T13:12:37.900021+00:00',
    receiver: users.foo,
    __typename: 'sui_hei_hint',
  },
];

export const puzzle = {
  id: 3287,
  genre: 1,
  title: 'Puzzle Title',
  status: 0,
  yami: 0,
  anonymous: true,
  created: '2019-06-17T12:46:13.164992+00:00',
  modified: '2019-06-17T12:46:13.164992+00:00',
  grotesque: false,
  sui_hei_user: users.carrot,
  __typename: 'sui_hei_puzzle',
  dazed_on: '2019-07-01',
  content: 'Test Question Content',
  solution: 'Test Solution',
  memo: 'Test Memo',
};

export const userFilterUsers = [
  {
    id: 13,
    nickname: 'Bar',
    dialogueCount: 1,
    dialogueUnsolvedCount: 1,
    dialogueHasTrue: false,
  },
  {
    id: 73,
    nickname: 'Foo',
    dialogueCount: 2,
    dialogueUnsolvedCount: 0,
    dialogueHasTrue: true,
  },
];
