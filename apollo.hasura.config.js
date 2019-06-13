module.exports = {
  client: {
    service: {
      name: 'hasura-graphqlengine',
      localSchemaFile: './generated/schema.graphql',
    },
    includes: [
      './graphql/Fragments/**',
      './graphql/LiveQueries/**',
      './graphql/Mutations/**',
      './graphql/Queries/**',
    ],
    addTypename: true,
  },
};
