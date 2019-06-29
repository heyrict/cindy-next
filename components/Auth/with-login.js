import { ApolloConsumer } from 'react-apollo';
import { connect } from 'react-redux';
import { setCookie } from 'common/cookie';
import { toast } from 'react-toastify';

import * as globalReducer from 'reducers/global';

import { webhookPost } from './webhook';

const mapDispatchToProps = dispatch => ({
  auth: user => dispatch(globalReducer.actions.auth(user)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

const withLogin = Wrapped =>
  withRedux(props => (
    <ApolloConsumer>
      {apolloClient => (
        <Wrapped
          login={(username, password) =>
            webhookPost('/webhook/login', {
              username,
              password,
            })
              .then(res => {
                const { id, username, nickname, token, errors } = res;
                if (!errors) {
                  setCookie('cindy-jwt-token', token, 30 * 24 * 60 * 60);
                  props.auth({
                    id,
                    username,
                    nickname,
                  });
                  apolloClient.resetStore();
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
