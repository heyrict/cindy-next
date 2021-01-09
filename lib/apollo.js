import { useMemo } from 'react';
import {
  split,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';
import isEqual from 'react-fast-compare';
import merge from 'deepmerge';
import { GRAPHQL_SERVER, GRAPHQL_CLIENT } from 'settings';
import { getCookie } from 'common/cookie';
import { WebSocketLink } from '@apollo/client/link/ws';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;
let graphqlConfig = GRAPHQL_CLIENT;

// Polyfill fetch() on the server (used by @apollo/client)
if (!process.browser) {
  global.fetch = fetch;
  graphqlConfig = GRAPHQL_SERVER;
}

const getAuthToken = headers => {
  if (headers && headers.cookie) {
    // On server side
    return getCookie('cindy-jwt-token', headers.cookie);
  } // On client side
  return getCookie('cindy-jwt-token');
};

function createApolloClient() {
  const authLink = new ApolloLink((operation, forward) => {
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

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: graphqlConfig.SUBSCRIPTION,
        options: {
          reconnect: true,
          connectionParams: {
            authToken: getAuthToken(),
          },
        },
      })
    : () => {
        console.log('SSR WSLINK');
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
    wsLink,
    authLink.concat(httpLink),
  );

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: joinedLink,
    cache: new InMemoryCache({
      possibleTypes: {
        PuzzleLog: ['Dialogue', 'Hint'],
      },
      typePolicies: {
        Query: {
          fields: {
            bookmarks: offsetLimitPagination(['filter', 'order']),
            chatrooms: offsetLimitPagination(['filter', 'order']),
            //chatmessages: offsetLimitPagination(['filter', 'order']),
            comments: offsetLimitPagination(['filter', 'order']),
            commentsInSolvedPuzzle: offsetLimitPagination(),
            commentsInSolvedPuzzle: offsetLimitPagination(),
            directMessages: offsetLimitPagination(['filter', 'order']),
            puzzleLogs: offsetLimitPagination(['filter', 'order']),
            puzzleStarRanking: offsetLimitPagination(),
            puzzleTags: offsetLimitPagination(['filter', 'order']),
            puzzles: offsetLimitPagination(['filter', 'order']),
            stars: offsetLimitPagination(['filter', 'order']),
            tags: offsetLimitPagination(['filter', 'order']),
            userDialogueRanking: offsetLimitPagination(),
            userPuzzleRanking: offsetLimitPagination(),
            userReceivedComments: offsetLimitPagination(['userId']),
            users: offsetLimitPagination(['filter', 'order']),
            dmReadAll: offsetLimitPagination(['userId']),
            unsolvedPuzzleStatsSub: {
              keyArgs: ['puzzleId'],
            },
            UserRankingRow: {
              keyArgs: false,
            },
            DmReadAllEntry: {
              keyArgs: false,
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
