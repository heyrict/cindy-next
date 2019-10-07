import React from 'react';
import isEqual from 'react-fast-compare';
import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';
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

  topRef = React.createRef<HTMLDivElement>();

  componentWillReceiveProps(nextProps: PaginatedQueryProps<TData, TVariables>) {
    if (!isEqual(nextProps.variables, this.props.variables)) {
      this.setState({ page: 1 });
    }
  }

  render() {
    const {
      itemsPerPage,
      getItemCount,
      renderItems,
      position,
      variables,
      ...queryProps
    } = this.props;

    const paginatorBar = this.state.numPages !== null && (
      <SimplePaginatorBar
        page={this.state.page}
        setPage={(page: number) => {
          this.setState({ page });
          if (this.topRef.current) {
            this.topRef.current.scrollIntoView();
          }
        }}
        numPages={this.state.numPages}
      />
    );

    return (
      <React.Fragment>
        <div ref={this.topRef} />
        {Boolean(position & PaginatorBarPosition.TOP) && paginatorBar}
        <Query<TData>
          {...queryProps}
          variables={{
            ...variables,
            limit: itemsPerPage,
            offset: (this.state.page - 1) * itemsPerPage,
          }}
          fetchPolicy="cache-and-network"
          onCompleted={data => {
            const numPages = Math.ceil(getItemCount(data) / itemsPerPage);
            if (this.state.numPages !== numPages)
              this.setState({
                numPages,
              });
          }}
        >
          {({ loading, error, data }: QueryResult<TData>) => {
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (loading) return <Loading centered />;
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
