export type GoogleAdProps = {
  client: string;
  slot: string;
  format: string;
  wrapperDivStyle?: React.CSSProperties;
  layoutKey?: string;
  layout?: string;
  userId?: number;
  children?: (ads: React.ReactElement) => React.ReactElement;
};

export const GoogleAdPropsDefaultProps = {
  wrapperDivStyle: {
    overflow: 'hidden',
    margin: '1em 0',
  },
};
