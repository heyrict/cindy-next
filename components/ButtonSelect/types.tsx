export type ButtonSelectOptionType<TValue = any> = {
  key: string | number;
  value: TValue;
  label?: React.ReactNode;
};

export const buttonSelectDefaultProps = {
  flexProps: {},
  buttonProps: {},
};

export type ButtonSelectProps<TValue = any> = {
  value: TValue;
  options: Array<ButtonSelectOptionType<TValue>>;
  onChange?: (option: ButtonSelectOptionType<TValue>) => any;
} & typeof buttonSelectDefaultProps;

export const buttonSelectStatefulDefaultProps = {
  flexProps: {},
  buttonProps: {},
};

export type ButtonSelectStatefulProps<TValue = any> = {
  initialValue: TValue;
  options: Array<ButtonSelectOptionType<TValue>>;
  onChange?: (next: TValue, prev: TValue) => TValue;
} & typeof buttonSelectStatefulDefaultProps;

export type ButtonSelectStatefulStates<TValue = any> = {
  value: TValue;
};
