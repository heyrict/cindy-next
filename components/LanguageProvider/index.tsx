import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { ActionContentType, StateType } from 'reducers/types';
import { LanguageProviderProps } from './types';
import { DEFAULT_LOCALE } from 'settings';

const getMessages = (locale: string) => require(`lang/${locale}.json`);

const LanguageProvider = ({
  children,
  language,
  initLocale,
  setLanguage,
  initNow,
}: LanguageProviderProps) => {
  useEffect(() => {
    setLanguage(initLocale);
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
  language: globalReducer.rootSelector(state).language,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setLanguage: (lang: string) =>
    dispatch(globalReducer.actions.setLanguage(lang)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(LanguageProvider);
