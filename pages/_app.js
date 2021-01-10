import React, { useEffect } from 'react';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
import { Provider as ReduxProvider } from 'react-redux';
import { changeTabularTab } from 'common/markdown/plugin-tabs';
import { domainFilter, addLocaleDatas, DEFAULT_LOCALE } from 'settings';

//import Chat from 'components/Chat';
import GlobalLayout from 'components/Layout';
import LanguageProvider from 'components/LanguageProvider';

import { useApollo } from '../lib/apollo';
import { useRedux } from '../lib/redux';
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

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const reduxStore = useRedux(pageProps.initialReduxState);

  useEffect(() => {
    const handleRouteChange = url => {
      reduxStore.dispatch(globalActions.routeChange(url));
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const eventDelegation = e => {
    const attr = e.target.attributes;
    if ('data-toggle' in attr && 'data-target' in attr) {
      if (attr['data-toggle'].value === 'tab') {
        changeTabularTab(attr['data-target'].value.replace(/^#/, ''));
        e.stopPropagation();
      }
    }
    if ('data-event' in attr) {
      switch (attr['data-event'].value) {
        case 'open-channel':
          if ('data-target' in attr) {
            reduxStore.dispatch(
              globalActions.channel.set(attr['data-target'].value),
            );
            reduxStore.dispatch(globalActions.aside.set(true));
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
  };

  useEffect(() => {
    window.addEventListener('click', eventDelegation);
    return () => window.removeEventListener('click', eventDelegation);
  });

  const locale = DEFAULT_LOCALE || 'ja';

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
