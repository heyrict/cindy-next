import { ApolloConsumer } from 'react-apollo';
import { Subscribe } from 'unstated';
import AuthContainer from 'containers/global/Auth';

const withLogout = Wrapped => props => (
  <ApolloConsumer>
    {apolloClient => (
      <Subscribe to={[AuthContainer]}>
        {cont => (
          <Wrapped
            logout={() =>
              new Promise((resolve, reject) => {
                document.cookie = `cindy-jwt-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
                cont.deauth();
                apolloClient.resetStore();
              })
            }
            {...props}
          />
        )}
      </Subscribe>
    )}
  </ApolloConsumer>
);

withLogout.displayName = 'withLogout(Component)';

export default withLogout;
