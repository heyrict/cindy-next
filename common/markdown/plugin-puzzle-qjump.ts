const HEAD_QNO_REGEXP = new RegExp('^(\\d+)');
const INSIDE_QNO_REGEXP = new RegExp('(((?:^|\\s|\\b))(Q)|(Ｑ))(\\d+)', 'g');

export const normPuzzleQjump = (string: string) =>
  string
    .replace(INSIDE_QNO_REGEXP, '$2[$3$4$5](#Q$5)')
    .replace(HEAD_QNO_REGEXP, '[$1](#Q$1)');
