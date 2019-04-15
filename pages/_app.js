import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider, addLocaleData } from 'react-intl';
import { ThemeProvider } from 'emotion-theming';
import { Provider as UnstatedProvider } from 'unstated';

//import Chat from 'components/Chat';
import GlobalLayout from 'components/Layout';

import { withApolloClient, theme } from '../lib';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();

    return { pageProps, locale, messages, initialNow };
  }

  render() {
    const {
      Component,
      apolloClient,
      initialNow,
      locale,
      messages,
      pageProps,
    } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <IntlProvider
              locale={locale}
              messages={messages}
              initialNow={initialNow}
            >
              <UnstatedProvider>
                <GlobalLayout>
                  <Component {...pageProps} />
                </GlobalLayout>
              </UnstatedProvider>
            </IntlProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
