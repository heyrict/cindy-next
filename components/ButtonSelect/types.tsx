export type ButtonSelectOptionType = {
  value: any;
  label?: React.ReactNode;
};

export const buttonSelectDefaultProps = {
  onChange: (_option: ButtonSelectOptionType): any => {},
  flexProps: {},
  buttonProps: {},
};

export type ButtonSelectProps = {
  value: any;
  options: Array<ButtonSelectOptionType>;
} & typeof buttonSelectDefaultProps;
