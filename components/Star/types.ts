import { OpacityProps, TypographyProps } from 'styled-system';

export const StarInputDefaultProps = {
  size: 4 as number | string,
};

export type StarInputProps = {
  initialValue?: number;
  onChange?: (value: number) => void;
} & typeof StarInputDefaultProps;

export type StarInputStates = {
  value: number;
  hoverValue: number;
  hover: boolean;
};

export type StarProps = {
  active?: boolean;
  half?: boolean;
  onClick?: (e: any) => void;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
} & OpacityProps &
  TypographyProps;
