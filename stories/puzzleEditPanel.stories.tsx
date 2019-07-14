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

const PuzzleEditPanelWrapper = ({ genre }: { genre: number }) => {
  const [status, setStatus] = useState(0);
  const [yami, setYami] = useState(0);
  const [grotesque, setGrotesque] = useState(false);
  const [dazedOn, setDazedOn] = useState('2019-03-01');

  return (
    <Flex flexWrap="wrap" width={1}>
      <table>
        <tbody>
          <th>
            <td>Current State</td>
            <td>
              <button
                onClick={() => {
                  setStatus(0);
                  setYami(0);
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
        dazed_on={dazedOn}
        updatePuzzle={({
          variables: { dazedOn, grotesque, status, yami },
        }: any) => {
          setYami(yami);
          setDazedOn(dazedOn);
          setGrotesque(grotesque);
          setStatus(status);
          return new Promise(() => {});
        }}
        show
      />
    </Flex>
  );
};

storiesOf('Views | PuzzleEditPanel', module)
  .add('General puzzle', () => (
    <IntlProvider locale="ja" initialNow={Date.now()}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <PuzzleEditPanelWrapper genre={0} />
      </ThemeProvider>
    </IntlProvider>
  ))
  .add('New or formal puzzle', () => (
    <IntlProvider locale="ja" initialNow={Date.now()}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <PuzzleEditPanelWrapper genre={3} />
      </ThemeProvider>
    </IntlProvider>
  ));
