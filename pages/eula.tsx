import React from 'react';
import Head from 'next/head';
import { text2md } from 'common/markdown';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { intlShape, IntlShape } from 'react-intl';
import eulaMessages from 'messages/pages/eula';

import Box from 'components/General/Box';

import { EULAProps } from 'pageTypes';
import { DEFAULT_LOCALE } from 'settings';
import { StateType } from 'reducers/types';

const getEULA = (locale: string) => require(`EULA/${locale}.md`).default;

const EULA = ({ language }: EULAProps, context: { intl: IntlShape }) => {
  const _ = context.intl.formatMessage as any;

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

EULA.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = (state: StateType) => ({
  language: settingReducer.rootSelector(state).language,
});

const withRedux = connect(mapStateToProps);

export default withRedux(EULA);
