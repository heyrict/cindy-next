import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'components/General/Img';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import yamiJp from 'svgs/yamiJp.svg';
import longtermYamiJp from 'svgs/longtermYamiJp.svg';

import messages from 'messages/components/puzzle';

const YamiText = ({ yami }) => {
  switch (yami) {
    case 1:
      return (
        <span>
          [<FormattedMessage {...messages.yami_yami} />]
        </span>
      );
    case 2:
      return (
        <span>
          [<FormattedMessage {...messages.yami_longtermYami} />]
        </span>
      );
    default:
      return null;
  }
};

const YamiImage = ({ yami }) => {
  switch (yami) {
    case 1:
      return <Img size="sm" pr={1} src={yamiJp} />;
    case 2:
      return <Img size="sm" pr={1} src={longtermYamiJp} />;
    default:
      return null;
  }
};

const Yami = ({ yami, showGenreImage }) =>
  showGenreImage ? <YamiImage yami={yami} /> : <YamiText yami={yami} />;

Yami.propTypes = {
  yami: PropTypes.number.isRequired,
  showGenreImage: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Yami);
