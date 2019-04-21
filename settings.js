const isDev = process.env.NODE_ENV !== 'production';

exports.GRAPHQL_ENDPOINT = isDev
  ? 'http://localhost:8080/v1alpha1/graphql'
  : 'http://165.227.21.196:8311/v1alpha1/graphql';

exports.DEFAULT_LOCALE = isDev ? 'en' : 'ja';

exports.APPLOCALES = ['en', 'ja'];
