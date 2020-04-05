export type ReplayPathSelectProps = {
  path: Array<string>;
  setPath: (path: Array<string>) => void;
};

export type ReplayKeywordSelectProps = {
  keywords?: Array<string>;
  pushKeyword: (keyword: string) => void;
};

export type ReplayPlayProps = {
  treeLoaded: boolean;
};
