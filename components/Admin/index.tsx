import { plural } from 'pluralize';
import { camelcase } from 'stringcase';
import { useState, useEffect } from 'react';
import buildGraphQLProvider from 'ra-data-graphql';
import { Admin, DataProvider, Resource } from 'react-admin';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'ra-core';

import { createApolloClient } from './apollo';
import buildQuery from './buildQuery';
import authProvider from './auth';

import LoginPage from './LoginPage';
import { UserList } from './resources/users';
import { PuzzleList, PuzzleEdit } from './resources/puzzle';

const App = () => {
  const [dataProvider, setDataProvider] = useState<null | DataProvider<string>>(
    null,
  );
  useEffect(() => {
    buildGraphQLProvider({
      buildQuery,
      client: createApolloClient() as any,
      introspection: {
        operationNames: {
          [GET_LIST]: (resource: any) =>
            camelcase(plural(resource.name) as string),
          [GET_ONE]: (resource: any) => resource.name.toLowerCase(),
          [GET_MANY]: (resource: any) =>
            camelcase(plural(resource.name) as string),
          [GET_MANY_REFERENCE]: (resource: any) =>
            camelcase(plural(resource.name) as string),
          [CREATE]: (resource: any) => `create${resource.name}`,
          [UPDATE]: (resource: any) => `update${resource.name}`,
          [DELETE]: (resource: any) => `delete${resource.name}`,
        },
        exclude: ['password'],
      },
    }).then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
  }, []);

  if (!dataProvider) {
    return <div>Loading</div>;
  }

  return (
    <Admin
      loginPage={LoginPage}
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
    >
      <Resource name="User" list={UserList} />
      <Resource name="Puzzle" list={PuzzleList} edit={PuzzleEdit} />
    </Admin>
  );
};

export default App;
