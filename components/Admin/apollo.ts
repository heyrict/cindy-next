import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { getAdminAuthToken } from 'common/auth';
import { GRAPHQL_CLIENT } from 'settings';

let graphqlConfig = GRAPHQL_CLIENT;

export const createApolloClient = () => {
  const authLink = new ApolloLink((operation, forward) => {
    const authToken = getAdminAuthToken();
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
    }
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: graphqlConfig.ENDPOINT, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers: {
      Accept: 'application/json',
    },
    fetchOptions: {
      method: 'POST',
    },
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      possibleTypes: {
        PuzzleLog: ['Dialogue', 'Hint'],
      },
    }),
  });
};
