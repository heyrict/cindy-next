const isDev = process.env.NODE_ENV !== 'production';

exports.GRAPHQL_ENDPOINT = isDev
  ? 'http://localhost:8080/v1alpha1/graphql'
  : '/v1alpha1/graphql';

exports.DEFAULT_LOCALE = isDev ? 'en' : 'ja';

exports.APPLOCALES = ['en', 'ja'];
