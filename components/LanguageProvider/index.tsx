import React from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE, APPLOCALES } from 'settings';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { StateType } from 'reducers/types';
import { LanguageProviderProps } from './types';

const messages: { [locale: string]: Record<string, string> } = Object.assign(
  {},
  ...APPLOCALES.map(locale => ({
    [locale]: require(`lang/${locale}.json`),
  })),
);

const getMessages = (locale: string) => messages[locale];

const LanguageProvider = ({
  children,
  language,
  initLocale,
}: LanguageProviderProps) => {
  const locale = language || initLocale || DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return (
    <IntlProvider
      key={locale}
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
};

const mapStateToProps = (state: StateType) => ({
  language: settingReducer.rootSelector(state).language,
});

const withRedux = connect(mapStateToProps);

export default withRedux(LanguageProvider);
