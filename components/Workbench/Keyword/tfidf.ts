import {
  TokenizeServerTokenType,
  TokenizeServerDialogueTokensType,
} from 'reducers/types';

type DocType = TokenizeServerDialogueTokensType;

const tf = (tokens: Array<TokenizeServerTokenType>) => {
  let len = tokens.length;
  return tokens
    .map(token => token.text)
    .reduce((prev, cur) => {
      prev.set(cur, 1 / len + (prev.get(cur) || 0));
      return prev;
    }, new Map<string, number>());
};

const idf = (len: number, ndoc: number) => {
  return Math.log(len / (1 + ndoc)) / Math.log(10);
};

export class Tfidf {
  len = 0;
  ncount = new Map<string, number>();
  ndocs = new Array<Map<string, number>>();

  constructor(props: { docs: DocType[] }) {
    let { docs } = props;
    docs.forEach((doc, index) => {
      this.ndocs.push(tf(doc.tokens));
      for (let key in this.ndocs[index].keys()) {
        this.ncount.set(key, this.ncount.get(key) || 1);
      }
    });
  }

  get_tfidf_value(doc_index: number, term: string) {
    if (!this.ndocs[doc_index].has(term) || !this.ncount.has(term)) return 0;

    return (
      this.ndocs[doc_index].get(term)! * idf(this.len, this.ncount.get(term)!)
    );
  }
}
