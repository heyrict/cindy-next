import React, { useState } from 'react';
import styled from 'theme/styled';

import { Box, Panel, ButtonTransparent, Img } from 'components/General';
import memoIcon from 'svgs/memo.svg';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';

import { text2raw } from 'common/markdown';
import { widthSplits } from './constants';

import { MemoFrameType } from './types';
import { RightAsideType, ActionContentType } from 'reducers/types';

function MemoFrame(props: MemoFrameType) {
  const { memo, setRightAside } = props;
  const memoRaw = text2raw(memo);

  return (
    <Box
      borderColor="grape.6"
      borderWidth="2px"
      borderStyle="groove"
      borderRadius={1}
      display="block"
      width={1}
      mx={widthSplits[2]}
      mb={4}
    >
      <ButtonTransparent
        onClick={() => setRightAside(RightAsideType.memo)}
        color="grape.6"
        borderColor="graphe.6"
        fontSize="1.2em"
        borderBottom={show ? '2px solid' : 'none'}
        width={1}
      >
        <Box width={1} bg="violet.1">
          <Img size="xs" mr={2} src={memoIcon} alt="Memo" title="memo" />
          <FormattedMessage {...messages.memoFromCreator} />
        </Box>
        <Box px={2}>
          {memoRaw.length > 100 ? `${memoRaw.substr(0, 100)}...` : memoRaw}
        </Box>
      </ButtonTransparent>
    </Box>
  );
}

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setRightAside: (rightAside: RightAsideType) =>
    dispatch(puzzleReducer.actions.setRightAside(rightAside)),
});

const withRedux = connect(mapDispatchToProps);

export default withRedux(MemoFrame);
