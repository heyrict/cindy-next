const NEWLINE_REGEXP = /\n(?=\n\n)/g;

const norm_newline = string => {
  return string.replace(NEWLINE_REGEXP, '<br>');
};

export default norm_newline;
