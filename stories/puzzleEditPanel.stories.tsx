import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
//import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import { IntlProvider } from 'react-intl';

import PuzzleEditPanel from 'components/Puzzle/Detail/ControlPanel/PuzzleEditPanel';
import { Genre, Status, Yami } from 'generated/globalTypes';

const PuzzleEditPanelWrapper = ({ genre }: { genre: Genre }) => {
  const [status, setStatus] = useState(Status.UNDERGOING);
  const [yami, setYami] = useState(Yami.NONE);
  const [grotesque, setGrotesque] = useState(false);
  const [dazedOn] = useState('2019-03-01');

  return (
    <Flex flexWrap="wrap" width={1}>
      <table>
        <tbody>
          <th>
            <td>Current State</td>
            <td>
              <button
                onClick={() => {
                  setStatus(Status.UNDERGOING);
                  setYami(Yami.NONE);
                  setGrotesque(false);
                }}
              >
                Reset State
              </button>
            </td>
          </th>
          <tr>
            <td>status</td>
            <td>=</td>
            <td>{status.toString()}</td>
          </tr>
          <tr>
            <td>yami</td>
            <td>=</td>
            <td>{yami.toString()}</td>
          </tr>
          <tr>
            <td>grotesque</td>
            <td>=</td>
            <td>{grotesque.toString()}</td>
          </tr>
          <tr>
            <td>dazedOn</td>
            <td>=</td>
            <td>{dazedOn.toString()}</td>
          </tr>
        </tbody>
      </table>
      <PuzzleEditPanel
        puzzleId={1}
        yami={yami}
        genre={genre}
        grotesque={grotesque}
        status={status}
        dazedOn={dazedOn}
        show
      />
    </Flex>
  );
};

storiesOf('Views | PuzzleEditPanel', module)
  .add('General puzzle', () => (
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <PuzzleEditPanelWrapper genre={Genre.CLASSIC} />
      </ThemeProvider>
    </IntlProvider>
  ))
  .add('New or formal puzzle', () => (
    <IntlProvider locale="ja">
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <PuzzleEditPanelWrapper genre={Genre.OTHERS} />
      </ThemeProvider>
    </IntlProvider>
  ));
