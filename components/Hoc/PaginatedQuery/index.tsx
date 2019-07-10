import React from 'react';
import { toast } from 'react-toastify';

import SimplePaginatorBar from './SimplePaginatorBar';

import { Query, QueryResult } from 'react-apollo';
import {
  PaginatedQueryProps,
  PaginatedQueryDefaultProps,
  PaginatedQueryStates,
  PaginatorBarPosition,
} from './types';
import { OperationVariables } from 'react-apollo/types';

class PaginatedQuery<
  TData = any,
  TVariables = OperationVariables
> extends React.Component<
  PaginatedQueryProps<TData, TVariables>,
  PaginatedQueryStates
> {
  static defaultProps = PaginatedQueryDefaultProps;

  state = {
    page: 1,
    numPages: null,
  } as PaginatedQueryStates;

  render() {
    const {
      itemsPerPage,
      getItemCount,
      renderItems,
      position,
      variables,
      ...queryProps
    } = this.props;

    const paginatorBar = this.state.numPages && (
      <SimplePaginatorBar
        page={this.state.page}
        setPage={(page: number) => this.setState({ page })}
        numPages={this.state.numPages}
      />
    );

    return (
      <React.Fragment>
        {Boolean(position & PaginatorBarPosition.TOP) && paginatorBar}
        <Query<TData>
          {...queryProps}
          variables={{
            ...variables,
            limit: itemsPerPage,
            offset: (this.state.page - 1) * itemsPerPage,
          }}
          onCompleted={data => {
            const numPages = Math.ceil(getItemCount(data) / itemsPerPage);
            if (this.state.numPages !== numPages)
              this.setState({
                numPages,
              });
          }}
        >
          {({ loading, error, data }: QueryResult<TData>) => {
            if (loading) return <span>Loading...</span>;
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (!data) return null;
            return renderItems(data);
          }}
        </Query>
        {Boolean(position & PaginatorBarPosition.BOTTOM) && paginatorBar}
      </React.Fragment>
    );
  }
}

export default PaginatedQuery;
