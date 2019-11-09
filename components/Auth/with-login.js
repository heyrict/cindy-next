import { ApolloConsumer } from '@apollo/react-common';
import { connect } from 'react-redux';
import { setCookie } from 'common/cookie';
import { getUser } from 'common/auth';
import { toast } from 'react-toastify';

import * as globalReducer from 'reducers/global';

import { webhookPost } from './webhook';
import { WEBHOOK_SERVER } from 'settings';

const mapDispatchToProps = dispatch => ({
  auth: user => dispatch(globalReducer.actions.auth(user)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

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
                const { jwt, errors } = res;
                if (!errors) {
                  setCookie('cindy-jwt-token', jwt, 30 * 24 * 60 * 60);
                  const user = getUser();
                  if (user) {
                    props.auth(user);
                  }
                } else {
                  errors.forEach(error => {
                    toast.error(`${error.type}: ${error.message}`);
                  });
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
