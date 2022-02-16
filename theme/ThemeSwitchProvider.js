import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme, { colorthemes } from './theme';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

export const ThemesEnum = {
  LIGHT: 0,
  DARK: 1,
};

const ThemeSwitchProvider = ({ theme, children }) => {
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

const mapStateToProps = state => ({
  theme: settingReducer.rootSelector(state).theme,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ThemeSwitchProvider);
