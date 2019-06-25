export type OuterBarProps = {
  percentage: number;
};

export type ProgressBarProps = {
  progress: number;
};

export type SwitchProps = {
  value: boolean;
};

export type ColorProps = {
  color?: string;
  bg?: string;
};

type LayoutBasisProps = {
  minWidth?: Array<string | number> | string | number;
  minHeight?: Array<string | number> | string | number;
  maxWidth?: Array<string | number> | string | number;
  maxHeight?: Array<string | number> | string | number;
  size?: Array<string | number> | string | number;
  overflow?: string;
  display?: string;
  verticalAlign?: string;
};

export type LayoutProps = {
  width?: Array<string | number> | string | number;
  height?: Array<string | number> | string | number;
} & LayoutBasisProps;

export type LayoutStrictProps = {
  width?: string | number;
  height?: string | number;
} & LayoutBasisProps;

export type FlexboxProps = {
  alignItems?: string;
  alignContent?: string;
  justifyItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  flexDirection?: string;
  flex?: string | number;
  flexGrow?: string | number;
  flexShrink?: string | number;
  flexBasis?: string;
  justifySelf?: string;
  alignSelf?: string;
  order?: number | string;
};

export const HeadingDefaultProps = {
  fontSize: 6,
};
