const PuzzleShowRegex = /^\/puzzle\/show\/(\d+)/;

export const getDefaultChannel = path => {
  const match = PuzzleShowRegex.exec(path);
  if (match) {
    return `puzzle-${match[1]}`;
  }
  return 'lobby';
};

export const getChannelWithPath = (channel, path) =>
  channel || getDefaultChannel(path);
