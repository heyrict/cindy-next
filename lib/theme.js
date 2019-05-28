// Color Palette from https://palx.jxnblk.com/c46243
import palxColor from './palx.json';

const breakpoints = ['40em', '52em', '64em', '90em'];

const colors = {
  ...palxColor,
  solarized: {
    white: '#ffebcd',
    black: '#002b36',
  },
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
  xs: '30px',
  sm: '45px',
  md: '60px',
  lg: '80px',
  xl: '105px',
  chat: '24em',
  toolbar: '3.5em',
  toolbuttonMin: '6em',
  toolbuttonMax: '15em',
};

const heights = [0, '100%'];
const widths = {};

heights.toolbar = '3.5em';
heights.channelbar = '2em';
heights.chatinput = '2.5em';

const theme = {
  breakpoints,
  colors,
  fontSizes,
  heights,
  mediaQueries,
  radii,
  sizes,
  space,
  widths,
};

export default theme;
