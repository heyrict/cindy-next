import { DocumentNode } from 'graphql';
import { OperationVariables, BaseQueryOptions } from '@apollo/client';
import { ApolloError } from '@apollo/client';

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
} & BaseQueryOptions<TVariables>;

export type PaginatedQueryProps<
  TData = any,
  TVariables = OperationVariables
> = {
  getItemCount: (data: TData) => number;
  renderItems: (data: TData) => JSX.Element | null;
} & typeof PaginatedQueryDefaultProps &
  QueryPropsWithoutChildren<TData, Omit<TVariables, 'limit' | 'offset'>>;

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
