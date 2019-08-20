import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE, APPLOCALES } from 'settings';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { ActionContentType, StateType } from 'reducers/types';
import { LanguageProviderProps } from './types';

const messages: { [locale: string]: object } = Object.assign(
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
  setLanguage,
  initNow,
}: LanguageProviderProps) => {
  useEffect(() => {
    if (!language) setLanguage(initLocale);
  }, []);

  const locale = language || initLocale || DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return (
    <IntlProvider
      key={locale}
      locale={locale}
      defaultLocale={DEFAULT_LOCALE}
      messages={messages}
      initialNow={initNow}
    >
      {children}
    </IntlProvider>
  );
};

const mapStateToProps = (state: StateType) => ({
  language: settingReducer.rootSelector(state).language,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setLanguage: (lang: string) =>
    APPLOCALES.findIndex(v => v === lang) >= 0 &&
    dispatch(settingReducer.actions.language.set(lang as typeof APPLOCALES[0])),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(LanguageProvider);
