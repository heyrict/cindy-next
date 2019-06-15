export type FixedButtonProps = {
  children: React.ReactNode;
  [buttonProp: string]: any;
};

export type ChatBoxInnerProps = {
  open: boolean;
};

export type ChatBoxProps = {
  children: React.ReactNode;
  aside: boolean;
  setTrueAside: () => void;
  setFalseAside: () => void;
};

export type ToolbarBoxBaseProps = {
  show: boolean;
};