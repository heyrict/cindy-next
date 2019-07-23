module.exports = {
  client: {
    service: {
      name: 'hasura-trigger-subscription',
      url: 'http://localhost:3001/subscriptions',
    },
    includes: ['./graphql/Fragments/**', './graphql/Subscriptions/**'],
    addTypename: true,
  },
};
