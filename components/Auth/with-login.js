import { ApolloConsumer } from '@apollo/client';
import { connect } from 'react-redux';
import { setCookie } from 'common/cookie';
import { getUser, parseAuthToken } from 'common/auth';
import { toast } from 'react-toastify';

import * as globalReducer from 'reducers/global';

import { webhookPost } from './webhook';
import { WEBHOOK_SERVER } from 'settings';

const mapDispatchToProps = dispatch => ({
  auth: user => dispatch(globalReducer.actions.auth(user)),
});

const withRedux = connect(null, mapDispatchToProps);

const ENDPOINT = `${WEBHOOK_SERVER}/login`;

const withLogin = Wrapped =>
  withRedux(props => (
    <ApolloConsumer>
      {apolloClient => (
        <Wrapped
          login={(username, password) =>
            webhookPost(ENDPOINT, {
              username,
              password,
            })
              .then(res => {
                const { data, error } = res;
                if (!error) {
                  try {
                    setCookie(
                      'cindy-jwt-token',
                      data.auth_token,
                      30 * 24 * 60 * 60,
                    );
                    const user = parseAuthToken(data.auth_token).clm.user;
                    if (user) {
                      props.auth(user);
                    }
                  } catch (e) {
                    toast.error(JSON.stringify(e));
                  }
                } else {
                  toast.error(error);
                }
                return res;
              })
              .catch(error => {
                toast.error(JSON.stringify(error));
              })
          }
          {...props}
        />
      )}
    </ApolloConsumer>
  ));
withLogin.displayName = 'withLogin(Component)';

export default withLogin;
