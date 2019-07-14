import fetch from 'node-fetch';
import { HttpLink, ApolloClient, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
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
