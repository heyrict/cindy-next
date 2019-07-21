import { PopperProps } from 'react-popper';

export const TooltipDefaultProps = {
  delay: 2000,
};

export type TooltipProps = {
  reference: React.ReactNode;
  tooltip: React.ReactNode;
  referenceStyles?: React.CSSProperties;
  popperStyles?: React.CSSProperties;
} & Omit<PopperProps, 'children'> &
  typeof TooltipDefaultProps;
