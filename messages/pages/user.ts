import { defineMessages } from 'react-intl';

const scope = 'user';

export const messages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'User Profile',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'User Profile in Cindy',
  },
  profileOf: {
    id: `${scope}.profileOf`,
    defaultMessage: "{nickname}'s Profile",
  },
  profileIsEmpty: {
    id: `${scope}.profileIsEmpty`,
    defaultMessage: 'This user does not have a profile',
  },
  currentUserProfileIsEmpty: {
    id: `${scope}.currentUserProfileIsEmpty`,
    defaultMessage:
      "It seems that you haven't written a profile yet. Introduce your self in a few words now!",
  },
  tab_info: {
    id: `${scope}.tab_info`,
    defaultMessage: 'Info',
  },
  tab_puzzles: {
    id: `${scope}.tab_puzzles`,
    defaultMessage: 'Puzzles',
  },
  comments_received: {
    id: `${scope}.comments_received`,
    defaultMessage: 'Comments Received',
  },
  comments_posted: {
    id: `${scope}.comments_posted`,
    defaultMessage: 'Comments Posted',
  },
});

export default messages;
