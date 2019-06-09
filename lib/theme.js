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

const sizes = [0, '100%'];
sizes.xxs = '15px';
sizes.xs = '30px';
sizes.sm = '45px';
sizes.md = '60px';
sizes.lg = '80px';
sizes.xl = '105px';
sizes.chat = '24em';
sizes.toolbar = '3.5em';
sizes.toolbuttonMin = '6em';
sizes.toolbuttonMax = '15em';
sizes.channelbar = '2em';
sizes.chatinput = '2.5em';

const theme = {
  breakpoints,
  colors,
  fontSizes,
  mediaQueries,
  radii,
  sizes,
  space,
};

export default theme;
