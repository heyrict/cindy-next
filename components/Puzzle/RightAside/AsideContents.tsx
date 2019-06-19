import React from 'react';
import styled from 'theme/styled';
import { text2md } from 'common/markdown';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/puzzle';

import { StateType, ActionContentType, RightAsideType } from 'reducers/types';
import { AsideContentsProps, AsideContentsInnerProps } from './types';
import Box from 'components/General/Box';

const PuzzleRightAsideTitle = styled.h1`
  color: ${p => p.theme.colors.grape[8]};
  font-size: 2em;
  text-align: center;
  margin: 0;
  border-bottom: 0.3em double ${p => p.theme.colors.grape[7]};
`;

const PuzzleRightAsideShader = styled.div<AsideContentsInnerProps>`
  display: none;
  ${p => p.theme.mediaQueries.medium} {
    display: ${p => (p.open ? 'flex' : 'none')};
    opacity: ${p => (p.open ? 1 : 0)};
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition-property: opacity;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    z-index: 190;
  }
`;

const PuzzleRightAsideBase = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  flex-shrink: 0;
  background-color: ${p => p.theme.colors.solarized.white};
  border-right: 2px solid ${p => p.theme.colors.orange[5]};
  height: 100%;
  z-index: 210;
  width: ${p => p.theme.sizes.chatXL};
  ${p => p.theme.mediaQueries.large} {
    width: ${p => p.theme.sizes.chatLG};
  }
`;

const ResponsivePuzzleRightAside = styled(PuzzleRightAsideBase)<
  AsideContentsInnerProps
>`
  opacity: ${p => (p.open ? 1 : 0)}
  visibility: ${p => (p.open ? 'visible' : 'hidden')};
  transform: ${p => (p.open ? 'none' : 'translateX(-100%)')};
  transition-property: transform, opacity, visibility;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  ${p => p.theme.mediaQueries.medium} {
    width: 62%;
    background-color: ${p => p.theme.colors.solarized.white};
  }
  ${p => p.theme.mediaQueries.small} {
    width: 80%;
  }
`;

const AsideContents = ({
  puzzleContent,
  puzzleMemo,
  rightAside,
  setRightAside,
}: AsideContentsProps) => {
  return (
    <React.Fragment>
      <ResponsivePuzzleRightAside open={rightAside !== RightAsideType.none}>
        {rightAside === RightAsideType.content && (
          <React.Fragment>
            <PuzzleRightAsideTitle>
              <FormattedMessage {...messages.content} />
            </PuzzleRightAsideTitle>
            <Box
              px={2}
              py={-2}
              dangerouslySetInnerHTML={{ __html: text2md(puzzleContent) }}
            />
          </React.Fragment>
        )}
        {rightAside === RightAsideType.memo && (
          <React.Fragment>
            <PuzzleRightAsideTitle>
              <FormattedMessage {...messages.memo} />
            </PuzzleRightAsideTitle>
            <Box
              px={2}
              py={-2}
              dangerouslySetInnerHTML={{ __html: text2md(puzzleMemo) }}
            />
          </React.Fragment>
        )}
      </ResponsivePuzzleRightAside>
      <PuzzleRightAsideShader
        open={rightAside !== RightAsideType.none}
        onClick={() => setRightAside(RightAsideType.none)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  puzzleContent: puzzleReducer.rootSelector(state).puzzleContent,
  puzzleMemo: puzzleReducer.rootSelector(state).puzzleMemo,
  rightAside: puzzleReducer.rootSelector(state).rightAside,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setRightAside: (rightAside: RightAsideType) =>
    dispatch(puzzleReducer.actions.setRightAside(rightAside)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(AsideContents);
