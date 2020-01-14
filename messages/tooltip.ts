import { defineMessages } from 'react-intl';

const scope = 'tooltip';

export const tooltipMessages = defineMessages({
  bold: {
    id: `${scope}.bold`,
    defaultMessage: 'Bold',
  },
  italic: {
    id: `${scope}.italic`,
    defaultMessage: 'Italic',
  },
  underline: {
    id: `${scope}.underline`,
    defaultMessage: 'Underline',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  picture: {
    id: `${scope}.picture`,
    defaultMessage: 'Picture',
  },
  href: {
    id: `${scope}.href`,
    defaultMessage: 'Link',
  },
  stamp: {
    id: `${scope}.stamp`,
    defaultMessage: 'Stamp',
  },
  tab: {
    id: `${scope}.tab`,
    defaultMessage: 'Tab',
  },
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview',
  },
  expand: {
    id: `${scope}.expand`,
    defaultMessage: 'Expand',
  },
  collapse: {
    id: `${scope}.collapse`,
    defaultMessage: 'Collapse',
  },
  scrollToTop: {
    id: `${scope}.scrollToTop`,
    defaultMessage: 'Scroll To Top',
  },
  scrollToBottom: {
    id: `${scope}.scrollToBottom`,
    defaultMessage: 'Scroll To Bottom',
  },
});

export default tooltipMessages;
