import React from 'react';
import Head from 'next/head';
import { injectIntl } from 'react-intl';

import Profile from 'components/Profile';

import messages from 'messages/pages/user';

import { UserPageProps } from 'pageTypes';

class User extends React.Component<UserPageProps> {
  static async getInitialProps({ query }: { query: { id: string } }) {
    return { userId: query && query.id };
  }

  render() {
    const _ = this.props.intl.formatMessage;
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

export default injectIntl(User);
