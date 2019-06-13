export type ModalComponentsProps = {
  show: boolean;
  className?: string;
};

export type ModalProps = {
  show: boolean;
  closefn?: () => void;
  children?: React.ReactNode;
};
