import React from 'react';
import styled from 'theme/styled';

import { connect } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

import { Img } from 'components/General';
import soupIcon from 'svgs/soup.svg';
import memoIcon from 'svgs/memo.svg';
import toTopIcon from 'svgs/toTop.svg';
import toBottomIcon from 'svgs/toBottom.svg';

import { ActionContentType, RightAsideType, StateType } from 'reducers/types';
import {
  RightAsideBoxBaseProps,
  RightAsideBoxProps,
  RightAsideBoxState,
  RightAsideBoxButtonProps,
} from './types';

const RightAsideBoxBase = styled.div<RightAsideBoxBaseProps>`
  display: flex;
  flex-direction: column;
  position: fixed;
  margin-top: 1em;
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: 0;
  width: 3em;
  height: auto;
  top: ${p => p.theme.sizes.toolbar};
  right: 2px;
  opacity: 0.8;
  background-color: ${p => p.theme.colors.orange[2]};
  z-index: 180;
  visibility: ${p => (p.show ? 'visible' : 'hidden')};
  transform: ${p => (p.show ? 'none' : 'translateX(100%)')};
  transition-property: transform, opacity, visibility;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
`;

const RightAsideBoxButton = styled.button<RightAsideBoxButtonProps>`
  background: ${p =>
    p.on ? p.theme.colors.orange[3] : p.theme.colors.orange[2]};
  width: 3em;
  height: ${p => p.height || '3em'};
  &:hover {
    background: ${p =>
      p.on ? p.theme.colors.orange[4] : p.theme.colors.orange[3]};
  }
  &:active {
    background: ${p =>
      p.on ? p.theme.colors.orange[5] : p.theme.colors.orange[4]};
  }
`;

class RightAsideBox extends React.Component<
  RightAsideBoxProps,
  RightAsideBoxState
> {
  state = {
    mini: false,
    showMini: true,
  };
  lastScrollTop = process.browser
    ? window.pageYOffset || document.documentElement.scrollTop
    : 0;
  handleScroll = () => {
    if (!this.state.mini) return;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > this.lastScrollTop && scrollY > 50) {
      this.state.showMini === true && this.setState({ showMini: false });
    } else {
      this.state.showMini === false && this.setState({ showMini: true });
    }
    this.lastScrollTop = scrollY <= 0 ? 0 : scrollY;
  };
  componentDidMount = () => {
    process.browser && window.addEventListener('scroll', this.handleScroll);
  };
  componentWillUnmount = () => {
    process.browser && window.removeEventListener('scroll', this.handleScroll);
  };
  render() {
    const { rightAside, setRightAside, puzzleMemo } = this.props;

    return (
      <RightAsideBoxBase show={!this.state.mini || this.state.showMini}>
        {this.state.mini && (
          <RightAsideBoxButton
            height="2em"
            onClick={() => this.setState({ mini: false })}
          >
            ⋯
          </RightAsideBoxButton>
        )}
        {!this.state.mini && (
          <React.Fragment>
            <RightAsideBoxButton
              on={rightAside === RightAsideType.content}
              onClick={() =>
                setRightAside(
                  rightAside === RightAsideType.content
                    ? RightAsideType.none
                    : RightAsideType.content,
                )
              }
            >
              <Img height="2em" src={soupIcon} alt="Soup" />
            </RightAsideBoxButton>
            {puzzleMemo !== '' && (
              <RightAsideBoxButton
                on={rightAside === RightAsideType.memo}
                onClick={() =>
                  setRightAside(
                    rightAside === RightAsideType.memo
                      ? RightAsideType.none
                      : RightAsideType.memo,
                  )
                }
              >
                <Img height="2em" src={memoIcon} alt="Memo" />
              </RightAsideBoxButton>
            )}
            <RightAsideBoxButton
              onClick={() =>
                window && window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            >
              <Img height="2em" src={toTopIcon} alt="Top" />
            </RightAsideBoxButton>
            <RightAsideBoxButton
              onClick={() =>
                window &&
                window.scrollTo({
                  top: document && document.body.scrollHeight,
                  behavior: 'smooth',
                })
              }
            >
              <Img height="2em" src={toBottomIcon} alt="Bottom" />
            </RightAsideBoxButton>
            <RightAsideBoxButton
              height="2em"
              onClick={() => this.setState({ mini: true })}
            >
              x
            </RightAsideBoxButton>
          </React.Fragment>
        )}
      </RightAsideBoxBase>
    );
  }
}

const mapStateToProps = (state: StateType) => ({
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

export default withRedux(RightAsideBox);
