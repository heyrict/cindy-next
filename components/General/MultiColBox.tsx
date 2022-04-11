import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import Box from './Box';
import {
  SpaceProps,
  TypographyProps,
  BorderProps,
  LayoutProps,
  OverflowProps,
} from 'styled-system';

import { StateType } from 'reducers/types';

type ColorProps = {
  color?: string;
};

type MultiColBoxProps = {
  multicol: boolean;
};

const multicolWidth = [1, 1 / 2, 1, 1 / 2, 1 / 3];

const MultiColBox = (
  props: SpaceProps &
    ColorProps &
    TypographyProps &
    BorderProps &
    LayoutProps &
    OverflowProps &
    MultiColBoxProps & { children: React.ReactElement; innerRef?: any },
) => (
  <Box
    ref={props.innerRef}
    width={props.multicol ? multicolWidth : 1}
    {...props}
  />
);

const mapStateToProps = (state: StateType) => ({
  multicol: settingReducer.rootSelector(state).multicol,
});

const withRedux = connect(mapStateToProps);

export default withRedux(MultiColBox);
