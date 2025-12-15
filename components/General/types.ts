import { ApolloError } from '@apollo/client';
import { TypographyProps, SpaceProps } from 'styled-system';

export type OuterBarProps = {
  percentage: number;
};

export type ProgressBarProps = {
  progress: number;
};

export type SwitchProps = {
  selected: boolean;
};

export interface HeadingProps
  extends TypographyProps,
    SpaceProps,
    React.HTMLAttributes<HTMLDivElement> {
  fontSize?: number;
}

export interface LoadingProps {
  centered?: boolean;
}

export type ErrorReloadProps = {
  error: ApolloError;
  refetch: () => any;
};
