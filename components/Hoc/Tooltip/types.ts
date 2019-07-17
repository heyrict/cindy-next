import { PopperProps } from 'react-popper';
import { Omit } from 'react-redux';

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
