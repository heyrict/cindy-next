import { ApolloConsumer } from '@apollo/client';
import { connect } from 'react-redux';
import { setCookie } from 'common/cookie';
import { getUser } from 'common/auth';
import { toast } from 'react-toastify';

import * as globalReducer from 'reducers/global';

import { webhookPost } from './webhook';
import { WEBHOOK_SERVER } from 'settings';

const ENDPOINT = `${WEBHOOK_SERVER}/signup`;

const mapDispatchToProps = dispatch => ({
  auth: user => dispatch(globalReducer.actions.auth(user)),
});

const withRedux = connect(null, mapDispatchToProps);

const withSignup = Wrapped =>
  withRedux(props => (
    <ApolloConsumer>
      {apolloClient => (
        <Wrapped
          signup={(nickname, username, password) =>
            webhookPost(ENDPOINT, {
              nickname,
              username,
              password,
            })
              .then(res => {
                const { data, error } = res;
                if (!error) {
                  setCookie(
                    'cindy-jwt-token',
                    data.auth_token,
                    30 * 24 * 60 * 60,
                  );
                  const user = getUser();
                  if (user) {
                    props.auth(user);
                  }
                } else {
                  toast.error(error);
                }
                return res;
              })
              .catch(error => {
                console.error(error);
                toast.error(JSON.stringify(error));
              })
          }
          {...props}
        />
      )}
    </ApolloConsumer>
  ));
withSignup.displayName = 'withSignup(Component)';

export default withSignup;
