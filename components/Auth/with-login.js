import { ApolloConsumer } from 'react-apollo';
import { connect } from 'react-redux';

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
            }).then(res => {
              const { id, username, nickname, token, errors } = res;
              if (!errors) {
                document.cookie = `cindy-jwt-token=${token}`;
                props.auth({
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
    </ApolloConsumer>
  ));
withLogin.displayName = 'withLogin(Component)';

export default withLogin;
