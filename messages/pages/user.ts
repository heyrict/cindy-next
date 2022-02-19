import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: `user.title`,
    defaultMessage: 'User Profile',
  },
  description: {
    id: `user.description`,
    defaultMessage: 'User Profile in Cindy',
  },
  profileOf: {
    id: `user.profileOf`,
    defaultMessage: "{nickname}'s Profile",
  },
  profileIsEmpty: {
    id: `user.profileIsEmpty`,
    defaultMessage: 'This user does not have a profile',
  },
  currentUserProfileIsEmpty: {
    id: `user.currentUserProfileIsEmpty`,
    defaultMessage:
      "It seems that you haven't written a profile yet. Introduce your self in a few words now!",
  },
  tab_info: {
    id: `user.tab_info`,
    defaultMessage: 'Info',
  },
  tab_footprints: {
    id: `user.tab_footprints`,
    defaultMessage: 'Footprints',
  },
  tab_puzzles: {
    id: `user.tab_puzzles`,
    defaultMessage: 'Puzzles',
  },
  comments_received: {
    id: `user.comments_received`,
    defaultMessage: 'Comments Received',
  },
  comments_posted: {
    id: `user.comments_posted`,
    defaultMessage: 'Comments Posted',
  },
});

export default messages;
