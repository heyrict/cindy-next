import { ApolloConsumer } from 'react-apollo';
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
              document.cookie = `cindy-jwt-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
              props.deauth();
              apolloClient.resetStore();
            })
          }
          {...props}
        />
      )}
    </ApolloConsumer>
  ));

withLogout.displayName = 'withLogout(Component)';

export default withLogout;
