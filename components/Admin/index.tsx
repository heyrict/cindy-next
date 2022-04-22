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
import { UserList, UserShow } from './resources/users';
import {
  UserAwardCreate,
  UserAwardEdit,
  UserAwardList,
  UserAwardShow,
} from './resources/userAwards';
import {
  AwardCreate,
  AwardEdit,
  AwardList,
  AwardShow,
} from './resources/awards';
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
          [GET_LIST]: resource => camelcase(plural(resource.name)),
          [GET_ONE]: resource => camelcase(resource.name),
          [GET_MANY]: resource => camelcase(plural(resource.name)),
          [GET_MANY_REFERENCE]: resource => camelcase(plural(resource.name)),
          [CREATE]: resource => `create${resource.name}`,
          [UPDATE]: resource => `update${resource.name}`,
          [DELETE]: resource => `delete${resource.name}`,
        },
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
      <Resource name="User" list={UserList} show={UserShow} />
      <Resource name="Puzzle" list={PuzzleList} edit={PuzzleEdit} />
      <Resource
        name="Award"
        list={AwardList}
        create={AwardCreate}
        edit={AwardEdit}
        show={AwardShow}
      />
      <Resource
        name="UserAward"
        list={UserAwardList}
        show={UserAwardShow}
        edit={UserAwardEdit}
        create={UserAwardCreate}
      />
    </Admin>
  );
};

export default App;
