import React from 'react';
import initApollo from './init-apollo';
import Head from 'next/head';
import { getDataFromTree } from '@apollo/react-ssr';
import { getCookie } from 'common/cookie';

const getAuthToken = headers => {
  if (headers && headers.cookie) {
    // On server side
    return getCookie('cindy-jwt-token', headers.cookie);
  } // On client side
  return getCookie('cindy-jwt-token');
};

export default App =>
  class WithApolloClient extends React.Component {
    static displayName = `withApollo(${App.displayName})`;
    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        {},
        {
          getAuthToken: () => getAuthToken(req.headers),
        },
      );
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          // NOTE: If getDataFromTree shows an error, try add the provider wrapper over App
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState, {
        getAuthToken,
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
