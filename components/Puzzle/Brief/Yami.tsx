import React from 'react';
import Img from 'components/General/Img';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import yamiJp from 'svgs/yamiJp.svg';
import longtermYamiJp from 'svgs/longtermYamiJp.svg';

import messages from 'messages/components/puzzle';

import { Yami as YamiType } from 'generated/globalTypes';

export type YamiInnerProps = {
  yami: YamiType;
};

export type YamiProps = {
  showGenreImage: boolean;
} & YamiInnerProps;

export const YamiText = ({ yami }: YamiInnerProps) => {
  switch (yami) {
    case YamiType.NORMAL:
      return (
        <span>
          [<FormattedMessage {...messages.yami_yami} />]
        </span>
      );
    case YamiType.LONGTERM:
      return (
        <span>
          [<FormattedMessage {...messages.yami_longtermYami} />]
        </span>
      );
    default:
      return null;
  }
};

export const YamiImage = ({ yami }: YamiInnerProps) => {
  switch (yami) {
    case YamiType.NORMAL:
      return <Img size="sm" pr={1} src={yamiJp} />;
    case YamiType.LONGTERM:
      return <Img size="sm" pr={1} src={longtermYamiJp} />;
    default:
      return null;
  }
};

export const Yami = ({ yami, showGenreImage }: YamiProps) =>
  showGenreImage ? <YamiImage yami={yami} /> : <YamiText yami={yami} />;

const mapStateToProps = (state: any) => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Yami);
