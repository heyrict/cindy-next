import { split } from 'apollo-link';
import { ApolloClient } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-unfetch';

import { GRAPHQL_SERVER, GRAPHQL_CLIENT } from 'settings';

let apolloClient = null;
let graphqlConfig = GRAPHQL_CLIENT;

// Polyfill fetch() on the server (used by @apollo/client)
if (!process.browser) {
  global.fetch = fetch;
  graphqlConfig = GRAPHQL_SERVER;
}

function create(initialState, { getAuthToken = () => '' }) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const authLink = new ApolloLink((operation, forward) => {
    //const authHeader = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const authToken = getAuthToken();
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }
    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: graphqlConfig.ENDPOINT, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      Accept: 'application/json',
    },
    fetchOptions: {
      method: 'POST',
    },
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });

  const wsLiveQueryLink = process.browser
    ? new WebSocketLink({
        uri: graphqlConfig.LIVEQUERY,
        options: {
          reconnect: true,
          connectionParams: {
            authToken: getAuthToken(),
          },
        },
      })
    : () => {
        console.log('SSR WSLIVEQUERY');
      };

  const joinedLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        process.browser &&
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLiveQueryLink,
    authLink.concat(httpLink),
  );

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: joinedLink,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
