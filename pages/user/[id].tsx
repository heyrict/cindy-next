import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { initializeApollo } from 'lib/apollo';
import { ApolloClient } from '@apollo/client';
import { USER_QUERY } from 'graphql/Queries/User';

import Profile from 'components/Profile';

import { useIntl } from 'react-intl';
import messages from 'messages/pages/user';

import {
  UserQuery,
  UserQueryVariables,
} from 'graphql/Queries/generated/UserQuery';

const UserPage = () => {
  const { formatMessage: _ } = useIntl();
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id as string, 10);

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      {userId && !isNaN(userId) && <Profile userId={userId} />}
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const apolloClient: ApolloClient<object> = initializeApollo();
  let { id } = context.query;
  const userId = parseInt(id as string, 10);

  await apolloClient.query<UserQuery, UserQueryVariables>({
    query: USER_QUERY,
    variables: {
      id: userId,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default UserPage;
