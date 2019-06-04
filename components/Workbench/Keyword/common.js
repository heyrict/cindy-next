import kuromoji from 'kuromoji';

let tokenizer;

const loadTokenizer = () => {
  if (process.browser) {
    return new Promise((resolve, reject) => {
      kuromoji
        .builder({
          dicPath: '/static/dict',
        })
        .build((err, tok) => {
          tokenizer = tok;
          resolve(tokenizer);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      kuromoji
        .builder({
          dicPath: 'node_modules/kuromoji/dict',
        })
        .build((err, tokenizer) => {
          tokenizer = tok;
          resolve(tokenizer);
        });
    });
  }
};

const defaultFilter = word =>
  (word.pos === '名詞' && word.pos_detail_1 !== '数') || word.pos === '動詞';

export const getKeywords = async (text, filter = defaultFilter) => {
  let tok = tokenizer || (await loadTokenizer());
  return tok
    .tokenize(text)
    .filter(defaultFilter)
    .map(o => (o.basic_form === '*' ? o.surface_form : o.basic_form));
};

export const counter = async (list, continueFrom) => {
  const counts = continueFrom || new Object();
  list.forEach(v => {
    if (v in counts) counts[v] += 1;
    else counts[v] = 1;
  });
  return counts;
};
