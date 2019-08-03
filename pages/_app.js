import React from 'react';
import Router from 'next/router';
import App, { Container } from 'next/app';
import { compose } from 'redux';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'emotion-theming';
import { Provider as ReduxProvider } from 'react-redux';
import { changeTabularTab } from 'common/markdown/plugin-tabs';
import {
  domainFilter,
  APPLOCALES,
  addLocaleDatas,
  DEFAULT_LOCALE,
} from 'settings';

//import Chat from 'components/Chat';
import GlobalLayout from 'components/Layout';
import LanguageProvider from 'components/LanguageProvider';

import { withApolloClient, withReduxStore } from '../lib';
import theme from 'theme';

import { actions as globalActions } from 'reducers/global';

if (process.browser) {
  const smoothscroll = require('smoothscroll-polyfill');
  smoothscroll.polyfill();
}

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined') {
  addLocaleDatas();
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const parse = require('url').parse;

    const { req } = ctx;
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const acceptLanguage = req.headers['accept-language'] || '';
    const acceptedLocale = (
      acceptLanguage.match(/[a-zA-Z\-]{2,10}/g) || []
    ).find(loc => APPLOCALES.findIndex(lang => lang === loc) !== -1);
    const locale = acceptedLocale || DEFAULT_LOCALE;
    const initialNow = Date.now();

    return { pageProps, locale, initialNow };
  }

  componentDidMount() {
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
              globalActions.channel.set(attr['data-target'].value),
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
