import { getPuzzleDetailPageId } from './pages';

export const getDefaultChannel = path => {
  const match = getPuzzleDetailPageId(path);
  if (match) {
    return `puzzle-${match}`;
  }
  return 'lobby';
};

export const getChannelWithPath = (channel, path) =>
  channel || getDefaultChannel(path);
