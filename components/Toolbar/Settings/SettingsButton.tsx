import React from 'react';
import { compose } from 'redux';

import { Box, ButtonTransparent, Img } from 'components/General';
import gearIcon from 'svgs/gear.svg';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { ActionContentType } from 'reducers/types';
import { SettingsButtonProps } from './types';

const SettingsButton = ({ setTrueSettingsModal }: SettingsButtonProps) => (
  <Box height={1} width={1}>
    <ButtonTransparent
      height={1}
      width={1}
      color="preset.menubar.fg"
      onClick={() => setTrueSettingsModal()}
    >
      <Img mr={1} src={gearIcon} height="xs" />
      <FormattedMessage {...toolbarMessages.settings} />
    </ButtonTransparent>
  </Box>
);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTrueSettingsModal: () =>
    dispatch(settingReducer.actions.settingsModal.setTrue()),
});

const withRedux = connect(null, mapDispatchToProps);

export default compose(withRedux)(SettingsButton);
