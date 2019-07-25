const SPACES_REGEX = new RegExp('[ 　]+');
export const asSearch = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return `%${trimmed.replace(SPACES_REGEX, '%')}%`;
};
