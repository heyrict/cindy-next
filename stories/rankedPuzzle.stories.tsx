import React from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { Provider as ReduxProvider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as settingReducer from 'reducers/setting';

import { IntlProvider } from 'react-intl';

import RankedPuzzle from 'components/Puzzle/RankedPuzzle';
import { RankedPuzzleDisplayType } from 'components/Puzzle/types';

// {{{ puzzle mock
const puzzle = {
  id: 1,
  genre: 0,
  title: 'Great Puzzle',
  status: 1,
  yami: 0,
  anonymous: false,
  created: '2019-01-01T06:00:00Z',
  modified: '2019-01-02T06:00:00Z',
  sui_hei_user: {
    id: 1,
    nickname: 'Foo',
  },
  sui_hei_stars_aggregate: {
    aggregate: {
      count: 2,
      sum: {
        value: 5,
      },
    },
  },
  sui_hei_comments_aggregate: {
    aggregate: {
      count: 1,
    },
  },
  sui_hei_bookmarks_aggregate: {
    aggregate: {
      count: 4,
    },
  },
  sui_hei_dialogues_aggregate: {
    aggregate: {
      count: 34,
    },
  },
};
// }}}

// {{{ redux mock
const ReduxStore = createStore(
  combineReducers({
    [settingReducer.scope]: settingReducer.reducer,
  }),
);
// }}}

storiesOf('Showcase | RankedPuzzle', module).add('default', () => (
  <ThemeProvider theme={theme}>
    <IntlProvider locale="ja">
      <ReduxProvider store={ReduxStore}>
        <Global styles={globalStyle} />
        <Flex width={1}>
          <RankedPuzzle
            rank={1}
            puzzle={puzzle}
            display={RankedPuzzleDisplayType.star}
          />
          <RankedPuzzle
            rank={1}
            puzzle={puzzle}
            display={RankedPuzzleDisplayType.bookmark}
          />
          <RankedPuzzle
            rank={1}
            puzzle={puzzle}
            display={RankedPuzzleDisplayType.comment}
          />
        </Flex>
      </ReduxProvider>
    </IntlProvider>
  </ThemeProvider>
));
