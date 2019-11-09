import fetch from 'node-fetch';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GRAPHQL_SERVER } from '../../settings';

const createClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_SERVER.ENDPOINT, fetch: fetch }),
    cache: new InMemoryCache(),
  });

exports.query = options => {
  const { query, variables } = options;
  const client = createClient();
  return client.query({
    query,
    variables,
  });
};

exports.mutation = options => {
  const { query, variables } = options;
  const client = createClient();
  return client.mutate({
    mutation,
    variables,
  });
};
