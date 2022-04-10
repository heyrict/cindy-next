import React from 'react';
import { ThemeProvider } from '@emotion/react';
import defaultTheme, { colorthemes } from './theme';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';

export const ThemesEnum = {
  LIGHT: 0,
  DARK: 1,
};

const ThemeSwitchProvider = ({ children }) => {
  const theme = useSelector(state => settingReducer.rootSelector(state).theme);
  let currentTheme = { ...defaultTheme, theme };
  switch (theme) {
    case ThemesEnum.LIGHT:
      currentTheme.colors = { ...currentTheme.colors, ...colorthemes.light };
      break;
    case ThemesEnum.DARK:
      currentTheme.colors = { ...currentTheme.colors, ...colorthemes.dark };
      break;
    default:
      currentTheme.colors = { ...currentTheme.colors, ...colorthemes.light };
      break;
  }

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default ThemeSwitchProvider;
