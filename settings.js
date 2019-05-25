const isDev = process.env.NODE_ENV !== 'production';

exports.GRAPHQL_ENDPOINT = isDev
  ? 'http://localhost:8080/v1/graphql'
  : 'http://165.227.21.196:8311/v1/graphql';

exports.GRAPHQL_WEBSOCKET_ENDPOINT = isDev
  ? 'ws://localhost:8080/v1/graphql'
  : 'ws://165.227.21.196:8311/v1/graphql';

exports.DEFAULT_LOCALE = isDev ? 'en' : 'ja';

exports.APPLOCALES = ['en', 'ja'];
