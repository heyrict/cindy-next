const fetch = require('node-fetch');
const { HttpLink, ApolloClient, InMemoryCache } = require('apollo-boost');
const gql = require('graphql-tag');
const { GRAPHQL_SERVER } = require('../../settings');

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
