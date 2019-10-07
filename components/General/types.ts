export type OuterBarProps = {
  percentage: number;
};

export type ProgressBarProps = {
  progress: number;
};

export type SwitchProps = {
  selected: boolean;
};

export const HeadingDefaultProps = {
  fontSize: 6,
};

export const LoadingDefaultProps = {
  centered: false,
};

export type LoadingProps = typeof LoadingDefaultProps;
