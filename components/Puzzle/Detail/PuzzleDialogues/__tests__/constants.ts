import { Status, Yami, Genre } from 'generated/globalTypes';

export const users = {
  foo: {
    id: 73,
    icon: null,
    nickname: 'Foo',
    username: 'Foo',
    currentAward: null,
    __typename: 'User' as 'User',
  },
  bar: {
    id: 13,
    icon: null,
    nickname: 'Bar',
    username: 'Bar',
    currentAward: null,
    __typename: 'User' as 'User',
  },
  carrot: {
    id: 621,
    icon: null,
    nickname: 'Carrot',
    username: 'last_scene',
    currentAward: null,
    __typename: 'User' as 'User',
  },
};

export const dialogues = [
  {
    id: 106338,
    qno: 1,
    good: false,
    true: false,
    question: 'Question by Foo',
    questionEditTimes: 0,
    answer: 'Answer Foo',
    answerEditTimes: 0,
    created: '2019-06-17T12:51:56.774611+00:00',
    answeredTime: '2019-06-17T12:53:40.056463+00:00',
    modified: '2019-06-17T12:53:40.056463+00:00',
    user: users.foo,
    __typename: 'Dialogue' as 'Dialogue',
  },
  {
    id: 106339,
    qno: 2,
    good: false,
    true: false,
    question: 'Question by Bar',
    questionEditTimes: 0,
    answer: 'Answer by Bar',
    answerEditTimes: 1,
    created: '2019-06-17T12:54:56.634567+00:00',
    answeredTime: '2019-06-17T12:55:56.464007+00:00',
    modified: '2019-06-17T12:55:56.464007+00:00',
    user: users.bar,
    __typename: 'Dialogue' as 'Dialogue',
  },
  {
    id: 106340,
    qno: 3,
    good: false,
    true: false,
    question: 'Question 2 by Foo',
    questionEditTimes: 0,
    answer: 'Answer 2 by Foo',
    answerEditTimes: 0,
    created: '2019-06-17T12:56:43.204862+00:00',
    answeredTime: '2019-06-17T12:57:24.681986+00:00',
    modified: '2019-06-17T12:57:24.681986+00:00',
    user: users.foo,
    __typename: 'Dialogue' as 'Dialogue',
  },
];

export const hints = [
  {
    id: 2845,
    content: 'General hint',
    created: '2019-06-17T13:12:37.900021+00:00',
    editTimes: 0,
    receiver: null,
    modified: '2019-06-17T13:12:37.900021+00:00',
    __typename: 'Hint' as 'Hint',
  },
  {
    id: 2848,
    content: 'Hint to Foo',
    created: '2019-06-17T13:12:37.900021+00:00',
    editTimes: 1,
    receiver: users.foo,
    modified: '2019-06-18T13:12:37.900021+00:00',
    __typename: 'Hint' as 'Hint',
  },
];

export const puzzle = {
  id: 3287,
  genre: Genre.TWENTY_QUESTIONS,
  title: 'Puzzle Title',
  status: Status.UNDERGOING,
  yami: Yami.NONE,
  anonymous: true,
  created: '2019-06-17T12:46:13.164992+00:00',
  modified: '2019-06-17T12:46:13.164992+00:00',
  grotesque: false,
  user: users.carrot,
  __typename: 'Puzzle' as 'Puzzle',
  dazedOn: '2019-07-01',
  content: 'Test Question Content',
  solution: 'Test Solution',
  memo: 'Test Memo',
};

export const userFilterUsers = [
  {
    id: 13,
    nickname: 'Bar',
    dialogueCount: 1,
    answeredDialogueCount: 1,
    trueAnswer: false,
  },
  {
    id: 73,
    nickname: 'Foo',
    dialogueCount: 2,
    answeredDialogueCount: 1,
    trueAnswer: true,
  },
];
