import { defineMessages } from 'react-intl';

const scope = 'components.puzzle';

export const messages = defineMessages({
  genre_classic: {
    id: `${scope}.genre_classic`,
    defaultMessage: 'Classic',
  },
  genre_twentyQuestions: {
    id: `${scope}.genre_twentyQuestions`,
    defaultMessage: 'Twenty Questions',
  },
  genre_littleAlbat: {
    id: `${scope}.genre_littleAlbat`,
    defaultMessage: 'Little Albat',
  },
  genre_others: {
    id: `${scope}.genre_others`,
    defaultMessage: 'Others',
  },
  yami_yami: {
    id: `${scope}.yami_yami`,
    defaultMessage: 'Yami',
  },
  yami_longtermYami: {
    id: `${scope}.yami_longtermYami`,
    defaultMessage: 'Long-term Yami',
  },
  status_undergoing: {
    id: `${scope}.status_undergoing`,
    defaultMessage: 'undergoing',
  },
  status_solved: {
    id: `${scope}.status_solved`,
    defaultMessage: 'solved',
  },
  status_dazed: {
    id: `${scope}.status_dazed`,
    defaultMessage: 'dazed',
  },
  status_hidden: {
    id: `${scope}.status_hidden`,
    defaultMessage: 'hidden',
  },
  status_forbidden: {
    id: `${scope}.status_forbidden`,
    defaultMessage: 'forbidden',
  },
  lastupdate: {
    id: `${scope}.lastupdate`,
    defaultMessage: 'Last Update',
  },
  createdAt: {
    id: `${scope}.createdAt`,
    defaultMessage: 'Created At',
  },
  solvedAt: {
    id: `${scope}.solvedAt`,
    defaultMessage: 'Solved At',
  },
  bookmark: {
    id: `${scope}.bookmark`,
    defaultMessage: 'Bookmark',
  },
  star: {
    id: `${scope}.star`,
    defaultMessage: 'Star',
  },
  comment: {
    id: `${scope}.comment`,
    defaultMessage: 'Comment',
  },
  replay: {
    id: `${scope}.replay`,
    defaultMessage: 'Replay',
  },
});

export default messages;
