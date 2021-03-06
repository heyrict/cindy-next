import React from 'react';

import { Box, ButtonTransparent, Img, Flex } from 'components/General';
import memoIcon from 'svgs/memo.svg';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';

import { text2raw } from 'common/markdown';
import { widthSplits } from './constants';

import { MemoFrameType } from './types';
import { ActionContentType } from 'reducers/types';

function MemoFrame(props: MemoFrameType) {
  const { memo, toggleRightAsideMemo } = props;
  const memoRaw = text2raw(memo);
  const memoRawContent =
    memoRaw.length > 100 ? `${memoRaw.substr(0, 100)}...` : memoRaw;

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
        onClick={() => toggleRightAsideMemo()}
        color="grape.6"
        width={1}
      >
        <Flex flexWrap="wrap" width={1}>
          <Box width={1} bg="violet.1" borderRadius={2} fontSize="1.2em">
            <Img size="xs" mr={2} src={memoIcon} alt="Memo" title="memo" />
            <FormattedMessage {...messages.memoFromCreator} />
          </Box>
          <Box
            px={2}
            py={1}
            fontSize="0.8em"
            dangerouslySetInnerHTML={{ __html: memoRawContent }}
          />
        </Flex>
      </ButtonTransparent>
    </Box>
  );
}

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleRightAsideMemo: () =>
    dispatch(puzzleReducer.actions.rightAside.toggle_memo()),
});

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(MemoFrame);
