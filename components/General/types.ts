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

export type TypographyProps = {
  fontFamily?: string;
  fontSize?: Array<number | string> | number | string;
  fontWeight?: Array<number | string> | number | string;
  lineHeight?: Array<number | string> | number | string;
  letterSpacing?: Array<number | string> | number | string;
  textAlign?: string;
  fontStyle?: string;
};

export type BorderProps = {
  border?: string | Array<string>;
  borderWidth?: number | string | Array<number | string>;
  borderStyle?: string | Array<string>;
  borderColor?: string | Array<string>;
  borderRadius?: number | string | Array<number | string>;
  borderTop?: number | string | Array<number | string>;
  borderRight?: number | string | Array<number | string>;
  borderBottom?: number | string | Array<number | string>;
  borderLeft?: number | string | Array<number | string>;
  borderX?: number | string | Array<number | string>;
  borderY?: number | string | Array<number | string>;
};

export type PositionProps = {
  position?: string | Array<string>;
  zIndex?: number | Array<number>;
  top?: number | string | Array<number | string>;
  right?: number | string | Array<number | string>;
  bottom?: number | string | Array<number | string>;
  left?: number | string | Array<number | string>;
};

export const HeadingDefaultProps = {
  fontSize: 6,
};
