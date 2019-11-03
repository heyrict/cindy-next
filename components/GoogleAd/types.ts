export type GoogleAdProps = {
  client: string;
  slot: string;
  format: string;
  wrapperDivStyle?: React.CSSProperties;
  layoutKey?: string;
  layout?: string;
};

export const GoogleAdPropsDefaultProps: {
  wrapperDivStyle: React.CSSProperties;
} = {
  wrapperDivStyle: {
    overflow: 'hidden',
    margin: '1em 0',
  },
};
