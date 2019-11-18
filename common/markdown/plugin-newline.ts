const NEWLINE_REGEXP = /\n(?=\n\n)/g;

const norm_newline = (s: string) => {
  return s.replace(NEWLINE_REGEXP, '<br>');
};

export default norm_newline;
