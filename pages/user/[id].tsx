import React from 'react';
import Head from 'next/head';
import { intlShape } from 'react-intl';

import Profile from 'components/Profile';

import messages from 'messages/pages/user';

import { UserPageProps } from './types';

class User extends React.Component<UserPageProps> {
  static contextTypes = {
    intl: intlShape,
  };

  static async getInitialProps({ query }: { query: { id: string } }) {
    return { userId: query && query.id };
  }

  render() {
    const _ = this.context.intl.formatMessage;
    const { userId } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{_(messages.title)} | Cindy</title>
          <meta name="description" content={_(messages.description)} />
        </Head>
        <Profile userId={userId} />
      </React.Fragment>
    );
  }
}

export default User;
