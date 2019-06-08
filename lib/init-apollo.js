import { split } from 'apollo-link';
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from 'apollo-boost';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-unfetch';

import {
  GRAPHQL_ENDPOINT,
  GRAPHQL_LIVEQUERY_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
} from 'settings';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getAuthToken }) {
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
    uri: GRAPHQL_ENDPOINT, // Server URL (must be absolute)
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
        uri: GRAPHQL_LIVEQUERY_ENDPOINT,
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

  const wsSubscriptionLink = process.browser
    ? new WebSocketLink({
        uri: GRAPHQL_SUBSCRIPTION_ENDPOINT,
        options: {
          reconnect: true,
          connectionParams: {
            authToken: getAuthToken(),
          },
        },
      })
    : () => {
        console.log('SSR WSSUB');
      };

  const wsLink = split(
    ({ operationName }) => operationName.search('LiveQuery') > 0,
    wsLiveQueryLink,
    wsSubscriptionLink,
  );

  const joinedLink = split(
    ({ query, operationName }) => {
      const definition = getMainDefinition(query);
      return (
        process.browser &&
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
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
