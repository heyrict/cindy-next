import React from 'react';
import Router from 'next/router';
import App from 'next/app';
import { compose } from 'redux';
import { ApolloProvider } from '@apollo/react-common';
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
addLocaleDatas();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { req } = ctx;

    if (!req) {
      return { pageProps, locale: null };
    }

    //const parse = require('url').parse;
    //const parsedUrl = parse(req.url, true);
    //const { pathname, query } = parsedUrl;

    const acceptLanguage = req.headers['accept-language'] || '';
    const acceptedLocale = (
      acceptLanguage.match(/[a-zA-Z\-]{2,10}/g) || []
    ).find(loc => APPLOCALES.findIndex(lang => lang === loc) !== -1);
    const locale = acceptedLocale || DEFAULT_LOCALE;

    return { pageProps, locale };
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
      const url = new URL(attr.href.value, window.location.href).href;
      const { selfDomain, href, as } = domainFilter(url);
      if (selfDomain && e.button === 0 /* left cick */) {
        e.preventDefault();
        Router.push(href, as);
      }
    }
  }

  render() {
    const {
      Component,
      apolloClient,
      reduxStore,
      locale,
      pageProps,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <ReduxProvider store={reduxStore}>
            <LanguageProvider initLocale={locale}>
              <GlobalLayout>
                <Component {...pageProps} />
              </GlobalLayout>
            </LanguageProvider>
          </ReduxProvider>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default compose(
  withApolloClient,
  withReduxStore,
)(MyApp);
