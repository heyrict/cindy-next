import React from 'react';
import Head from 'next/head';
import { FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Box, Button } from 'components/General';
import { withLogout } from 'components/Auth';

import messages from 'messages/pages/home';

const TESTQUERY = gql`
  query testquery {
    sui_hei_user(limit: 5, order_by: [{ id: asc }]) {
      id
      username
      nickname
      password
    }
  }
`;

function Home(props) {
  return (
    <div>
      <Head>
        <title>Title</title>
      </Head>
      <FormattedMessage {...messages.title}>
        {msg => <h1>{msg}</h1>}
      </FormattedMessage>
      <Query query={TESTQUERY} ssr={false}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return JSON.stringify(error);
          return JSON.stringify(data.sui_hei_user);
        }}
      </Query>
      <Button
        borderColor="yamabukicha"
        borderWidth={1}
        onClick={() => props.logout()}
      >
        Logout
      </Button>
    </div>
  );
}

export default withLogout(Home);
