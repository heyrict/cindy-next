import React from 'react';

import { Query } from '@apollo/react-components';
import { USER_QUERY } from 'graphql/Queries/User';

import ProfileInfoRenderer from './InfoRenderer';

import { ProfileProps } from './types';
import {
  UserQuery,
  UserQueryVariables,
} from 'graphql/Queries/generated/UserQuery';

const Profile = ({ userId }: ProfileProps) => {
  return (
    <Query<UserQuery, UserQueryVariables>
      query={USER_QUERY}
      variables={{
        id: userId,
      }}
    >
      {params => <ProfileInfoRenderer {...params} />}
    </Query>
  );
};

export default Profile;
