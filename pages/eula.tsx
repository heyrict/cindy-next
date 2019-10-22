import React from 'react';
import Head from 'next/head';
import { text2md } from 'common/markdown';

import { compose } from 'redux';
import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { injectIntl } from 'react-intl';
import eulaMessages from 'messages/pages/eula';

import Box from 'components/General/Box';

import { EULAProps } from 'pageTypes';
import { DEFAULT_LOCALE } from 'settings';
import { StateType } from 'reducers/types';

const getEULA = (locale: string) => require(`EULA/${locale}.md`).default;

const EULA = ({ intl, language }: EULAProps) => {
  const _ = intl.formatMessage;

  const locale = language || DEFAULT_LOCALE;
  const eulaText = getEULA(locale);

  return (
    <React.Fragment>
      <Head>
        <title>{_(eulaMessages.title)} | Cindy</title>
        <meta name="description" content={_(eulaMessages.description)} />
      </Head>
      <Box p={2} dangerouslySetInnerHTML={{ __html: text2md(eulaText) }} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  language: settingReducer.rootSelector(state).language,
});

const withRedux = connect(mapStateToProps);

export default compose(
  injectIntl,
  withRedux,
)(EULA);
