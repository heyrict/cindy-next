import { defineMessages } from 'react-intl';

const scope = 'tag';

export const tagMessages = defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Tag Page',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Puzzles with tag',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Tag',
  },
  titleWithName: {
    id: `${scope}.titleWithName`,
    defaultMessage: 'Tag: {name}',
  },
  descriptionWithName: {
    id: `${scope}.descriptionWithName`,
    defaultMessage: 'Puzzles with tag "{name}"',
  },
  headerWithName: {
    id: `${scope}.headerWithName`,
    defaultMessage: 'Tag: {name}',
  },
});

export default tagMessages;
