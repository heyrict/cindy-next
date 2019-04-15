import { ApolloConsumer } from 'react-apollo';
import { Subscribe } from 'unstated';
import AuthContainer from 'containers/global/Auth';

import { webhookPost } from './webhook';

const withLogin = Wrapped => props => (
  <ApolloConsumer>
    {apolloClient => (
      <Subscribe to={[AuthContainer]}>
        {cont => (
          <Wrapped
            login={(username, password) =>
              webhookPost('/webhook/login', {
                username,
                password,
              }).then(res => {
                const { id, username, nickname, token, errors } = res;
                if (!errors) {
                  document.cookie = `cindy-jwt-token=${token}`;
                  cont.auth({
                    id,
                    username,
                    nickname,
                  });
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
withLogin.displayName = 'withLogin(Component)';

export default withLogin;
