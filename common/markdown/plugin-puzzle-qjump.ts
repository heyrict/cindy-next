const HEAD_QNO_REGEXP = new RegExp('^(\\d+)');
const INSIDE_QNO_REGEXP = new RegExp(
  '(((?:^|[^#a-zA-Z0-9\\[](\\s|\\b)))(Q|A)|(((?:^|[^\\[]))(Ｑ|Ａ)))(\\d+)',
  'g',
);

export const normPuzzleQjump = (string: string) =>
  string
    .replace(INSIDE_QNO_REGEXP, '$2$6[$4$7$8](#Q$8)')
    .replace(HEAD_QNO_REGEXP, '[$1](#Q$1)');
