import { ApolloConsumer } from 'react-apollo';
import { setCookie } from 'common/cookie';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

const mapDispatchToProps = dispatch => ({
  deauth: () => dispatch(globalReducer.actions.deauth()),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

const withLogout = Wrapped =>
  withRedux(props => (
    <ApolloConsumer>
      {apolloClient => (
        <Wrapped
          logout={() =>
            new Promise((resolve, reject) => {
              setCookie('cindy-jwt-token', '', -100);
              props.deauth();
            })
          }
          {...props}
        />
      )}
    </ApolloConsumer>
  ));

withLogout.displayName = 'withLogout(Component)';

export default withLogout;
