// Color Palette from https://palx.jxnblk.com/c46243
import palxColor from './palx.json';
import palxDarkColor from './palx-dark.json';

export const colorthemes = {
  light: palxColor,
  dark: palxDarkColor,
};

const breakpoints = ['40em', '52em', '64em', '90em'];

const colors = {
  ...palxColor,
  ...colorthemes,
};

const fontSizes = [12, 14, 16, 20, 24, 32, 42, 56];

const mediaQueries = {
  small: `@media screen and (max-width: ${breakpoints[0]})`,
  medium: `@media screen and (max-width: ${breakpoints[1]})`,
  large: `@media screen and (max-width: ${breakpoints[2]})`,
};

const radii = [0, 4, 8, 16, 9999];

const space = [0, 4, 8, 16, 32];

const sizes = {
  0: 0,
  1: '100%',
  xxs: '15px',
  xs: '30px',
  sm: '45px',
  md: '60px',
  lg: '80px',
  xl: '105px',
  chatXL: '30em',
  chatLG: '24em',
  toolbar: '3.5em',
  toolbuttonMin: '6em',
  toolbuttonMax: '15em',
  channelbar: '2em',
  chatinput: '7em',
};

const theme = {
  breakpoints,
  colors,
  colorthemes,
  fontSizes,
  mediaQueries,
  radii,
  sizes,
  space,
};

export default theme;
