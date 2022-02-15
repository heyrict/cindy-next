import { ONLINE_USER_POLL_INTERVAL } from 'settings';
import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';

import { useQuery } from '@apollo/client';
import { ONLINE_USERS_QUERY } from 'graphql/Queries/Misc';

import { OnlineUsersQuery } from 'graphql/Queries/generated/OnlineUsersQuery';

const ActiveUserCounter = () => {
  const { data } = useQuery<OnlineUsersQuery>(ONLINE_USERS_QUERY, {
    pollInterval: ONLINE_USER_POLL_INTERVAL * 1000,
  });
  const count = data ? data.onlineUsersCount : '...';

  return (
    <FormattedMessage {...toolbarMessages.usersOnline} values={{ count }} />
  );
};

export default ActiveUserCounter;
