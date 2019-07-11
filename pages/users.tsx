import React from 'react';
import Head from 'next/head';

import { FormattedMessage, intlShape, IntlShape } from 'react-intl';
import messages from 'messages/pages/users';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { USER_LIST_QUERY } from 'graphql/Queries/User';

import { Heading, Flex, Box } from 'components/General';
import UserPanel from 'components/User/UserPanel';

import {
  UserListQuery,
  UserListQueryVariables,
} from 'graphql/Queries/generated/UserListQuery';

const userWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];

const Users = (_props: any, context: { intl: IntlShape }) => {
  const _: any = context.intl.formatMessage;

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Flex flexWrap="wrap">
        <PaginatedQuery<UserListQuery, UserListQueryVariables>
          query={USER_LIST_QUERY}
          variables={{ limit: 20 }}
          fetchPolicy="cache-first"
          getItemCount={data =>
            (data.sui_hei_user_aggregate &&
              data.sui_hei_user_aggregate.aggregate &&
              data.sui_hei_user_aggregate.aggregate.count) ||
            0
          }
          renderItems={data => {
            const users = data.sui_hei_user;
            return users.map(user => (
              <Box key={user.id} width={userWidth}>
                <UserPanel user={user} />
              </Box>
            ));
          }}
        />
      </Flex>
    </React.Fragment>
  );
};

Users.contextTypes = {
  intl: intlShape,
};

export default Users;
