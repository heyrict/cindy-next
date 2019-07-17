import { defineMessages } from 'react-intl';

const scope = 'components.user';

export const messages = defineMessages({
  anonymousUser: {
    id: `${scope}.anonymousUser`,
    defaultMessage: 'Anonymous User',
  },
  withAnonymousPatrons: {
    id: `${scope}.withAnonymousPatrons`,
    defaultMessage: ', with {count} anonymous patrons.',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  useraward: {
    id: `${scope}.useraward`,
    defaultMessage: 'Award',
  },
  puzzleCount: {
    id: `${scope}.puzzleCount`,
    defaultMessage: 'Puzzles',
  },
  dialogueCount: {
    id: `${scope}.dialogueCount`,
    defaultMessage: 'Dialogues',
  },
  goodQuestionCount: {
    id: `${scope}.goodQuestionCount`,
    defaultMessage: 'Good Questions',
  },
  trueAnswerCount: {
    id: `${scope}.trueAnswerCount`,
    defaultMessage: 'True Answers',
  },
  commentCount: {
    id: `${scope}.commentCount`,
    defaultMessage: 'Comments',
  },
  recvCommentCount: {
    id: `${scope}.recvCommentCount`,
    defaultMessage: 'Comments Received',
  },
  starCount: {
    id: `${scope}.starCount`,
    defaultMessage: 'Stars',
  },
  recvStarCount: {
    id: `${scope}.recvStarCount`,
    defaultMessage: 'Stars Received',
  },
  hideBookmark: {
    id: `${scope}.hideBookmark`,
    defaultMessage: 'Hide Bookmark',
  },
});

export default messages;
