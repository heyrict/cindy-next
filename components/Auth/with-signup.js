import { ApolloConsumer } from 'react-apollo';
import { Subscribe } from 'unstated';
import AuthContainer from 'containers/global/Auth';

import { webhookPost } from './webhook';

const withSignup = Wrapped => props => (
  <ApolloConsumer>
    {apolloClient => (
      <Subscribe to={[AuthContainer]}>
        {cont => (
          <Wrapped
            signup={(nickname, username, password) =>
              webhookPost('/webhook/signup', {
                nickname,
                username,
                password,
              }).then(res => {
                const { id, username, nickname, token, errors } = res;
                if (!errors) {
                  document.cookie = `cindy-jwt-token=${token}`;
                  cont.auth({ id, username, nickname });
                  apolloClient.resetStore();
                }
                return res;
              })
            }
            {...props}
          />
        )}
      </Subscribe>
    )}
  </ApolloConsumer>
);
withSignup.displayName = 'withSignup(Component)';

export default withSignup;
