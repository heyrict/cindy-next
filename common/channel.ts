import { getPuzzleDetailPageId } from './pages';

export const getDefaultChannel = (path: string) => {
  const match = getPuzzleDetailPageId(path);
  console.log(path, match);
  if (match) {
    return `puzzle-${match}`;
  }
  return 'lobby';
};

export const getChannelWithPath = (channel: string, path: string) =>
  channel || getDefaultChannel(path);
