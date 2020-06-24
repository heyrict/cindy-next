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
  // The count that each term appears in docs
  ncount = new Map<string, number>();
  // Term frequency in docs
  ndocs = new Map<number, Map<string, number>>();

  constructor(props: { docs: DocType[] }) {
    let { docs } = props;
    docs.forEach(doc => {
      this.ndocs.set(doc.id, tf(doc.tokens));
      Array.from(this.ndocs.get(doc.id)!.keys()).forEach(key => {
        this.ncount.set(key, (this.ncount.get(key) || 0) + 1);
      });
      this.len += 1;
    });
  }

  get_tfidf_value(id: number, term: string) {
    if (
      !this.ndocs.has(id) ||
      !this.ndocs.get(id)!.has(term) ||
      !this.ncount.has(term)
    )
      return null;

    return (
      this.ndocs.get(id)!.get(term)! * idf(this.len, this.ncount.get(term)!)
    );
  }
}
