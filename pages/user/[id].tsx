import React from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';

import Profile from 'components/Profile';

import messages from 'messages/pages/user';
import {useRouter} from 'next/router';

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
        {userId && !isNaN(userId) && (
          <Profile userId={userId} />
        )}
      </React.Fragment>
    );
  }

export default UserPage;
