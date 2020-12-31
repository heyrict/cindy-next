module.exports = {
  client: {
    service: {
      name: 'cindy-next-rust',
      localSchemaFile: './generated/schema.graphql',
    },
    includes: [
      './graphql/Fragments/**',
      './graphql/Mutations/**',
      './graphql/Queries/**',
    ],
    addTypename: true,
  },
};
