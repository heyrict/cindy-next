module.exports = {
  client: {
    service: {
      name: 'hasura-trigger-subscription',
      url: 'http://localhost:3000/subscriptions',
    },
    includes: [
      './graphql/Fragments/**',
      "./graphql/Subscriptions/*.js",
    ],
    addTypename: true,
  },
};
