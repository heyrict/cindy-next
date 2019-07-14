import { OperationVariables, QueryOpts } from 'react-apollo/types';
import { DocumentNode } from 'apollo-link/lib/types';
import { ApolloError } from 'apollo-client/errors/ApolloError';

export enum PaginatorBarPosition {
  NONE = 0b00,
  TOP = 0b01,
  BOTTOM = 0b10,
  BOTH = 0b11,
}

export const PaginatedQueryDefaultProps = {
  itemsPerPage: 18,
  position: PaginatorBarPosition.BOTH,
};

type QueryPropsWithoutChildren<TData, TVariables> = {
  query: DocumentNode;
  displayName?: string;
  skip?: boolean;
  onCompleted?: (data: TData) => void;
  onError?: (error: ApolloError) => void;
} & QueryOpts<TVariables>;

export type PaginatedQueryProps<
  TData = any,
  TVariables = OperationVariables
> = {
  getItemCount: (data: TData) => number;
  renderItems: (data: TData) => React.ReactNode;
} & typeof PaginatedQueryDefaultProps &
  QueryPropsWithoutChildren<TData, TVariables>;

export type PaginatedQueryStates = {
  page: number;
  numPages: number | null;
};

export type SimplePaginatorBarProps = {
  setPage: (page: number) => void;
  page: number;
  numPages: number;
};

export type SqBtnProps = {
  disabled?: boolean;
};
