import React from 'react';
import Router from 'next/router';
import App, { Container } from 'next/app';
import { compose } from 'redux';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider, addLocaleData } from 'react-intl';
import { ThemeProvider } from 'emotion-theming';
import { Provider as ReduxProvider } from 'react-redux';
import { changeTabularTab } from 'common/markdown/plugin-tabs';
import { domainFilter } from 'settings';

//import Chat from 'components/Chat';
import GlobalLayout from 'components/Layout';
import LanguageProvider from 'components/LanguageProvider';

import { withApolloClient, withReduxStore } from '../lib';
import theme from 'theme';

import { actions as globalActions } from 'reducers/global';

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

  componentDidMount() {
    // unclean mock for set channel
    window.openChat = channelName => {
      this.props.reduxStore.dispatch(globalActions.setChannel(channelName));
      return void 0;
    };

    window.addEventListener('click', this.eventDelegation.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.eventDelegation.bind(this));
  }
  eventDelegation(e) {
    const attr = e.target.attributes;
    if ('data-toggle' in attr && 'data-target' in attr) {
      if (attr['data-toggle'].value === 'tab') {
        changeTabularTab(attr['data-target'].value.replace(/^#/, ''));
      }
    }
    if ('data-event' in attr) {
      switch (attr['data-event'].value) {
        case 'open-channel':
          if ('data-target' in attr) {
            this.props.reduxStore.dispatch(
              globalActions.setChannel(attr['data-target'].value),
            );
          }
          break;
      }
    }
    if (typeof e.target.onclick !== 'function' && 'href' in attr) {
      const { selfDomain, url } = domainFilter(attr.href.value);
      if (selfDomain && e.button === 0 /* left cick */) {
        e.preventDefault();
        Router.push(url);
      }
    }
  }

  render() {
    const {
      Component,
      apolloClient,
      reduxStore,
      initialNow,
      locale,
      messages,
      pageProps,
    } = this.props;

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <ReduxProvider store={reduxStore}>
              <LanguageProvider initLocale={locale} initNow={initialNow}>
                <GlobalLayout>
                  <Component {...pageProps} />
                </GlobalLayout>
              </LanguageProvider>
            </ReduxProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default compose(
  withApolloClient,
  withReduxStore,
)(MyApp);
