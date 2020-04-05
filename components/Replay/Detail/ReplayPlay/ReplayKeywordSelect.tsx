import React from 'react';

import { connect } from 'react-redux';
import * as replayReducer from 'reducers/replay';
import { keywordsSelector } from './selectors';

import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import ButtonTransparent from 'components/General/ButtonTransparent';

import { StateType, ActionContentType } from 'reducers/types';
import { ReplayKeywordSelectProps } from './types';

const ReplayKeywordSelect = ({
  keywords,
  pushKeyword,
}: ReplayKeywordSelectProps) =>
  keywords && keywords.length > 0 ? (
    <>
      <Box
        width={1}
        borderRadius="5px 5px 0 0"
        bg="indigo.7"
        px={2}
        color="indigo.1"
      >
        Keywords
      </Box>
      <Flex
        flexWrap="wrap"
        width={1}
        maxHeight="400px"
        overflowY="auto"
        border="2px solid"
        borderRadius="0 0 5px 5px"
        borderColor="indigo.7"
        mb={1}
      >
        {keywords.map(kw => (
          <ButtonTransparent key={kw} onClick={() => pushKeyword(kw)} mr={1}>
            {kw}
          </ButtonTransparent>
        ))}
      </Flex>
    </>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  keywords: keywordsSelector(state),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  pushKeyword: (keyword: string) =>
    dispatch(replayReducer.actions.path.push(keyword)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplayKeywordSelect);
