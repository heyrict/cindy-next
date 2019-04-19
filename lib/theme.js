const breakpoints = ['40em', '52em', '64em'];

// Colors from http://nipponcolors.com/
const colors = {
  // White
  white: '#ffebcd',
  hakuren: '#fcfaf2',
  taikoh: '#f8c3cd',
  torinoko: '#dac9a6',
  // Gray to Black
  haizakura: '#d7c4bb',
  shironezumi: '#bdc0ba',
  sakuranezumi: '#b19693',
  ginnezumi: '#91989f',
  namari: '#787878',
  nibi: '#656765',
  aonibi: '#535953',
  dobunezumi: '#4f4f48',
  keshizumi: '#434343',
  aizumicha: '#373c38',
  sumi: '#1c1c1c',
  kuro: '#080808',
  // Red
  sakura: '#fedfe1',
  umenezumi: '#9e7a7a',
  usubeni: '#e87a90',
  imayoh: '#d05a6e',
  nakabeni: '#db4d6d',
  beni: '#cb1b45',
  akabeni: '#cb4042',
  // Brown
  terigaki: '#c46243',
  edocha: '#af5f3c',
  kakishibu: '#a35e47',
  hiwada: '#854836',
  kurikawacha: '#6a4028',
  momoshiocha: '#724938',
  kogecha: '#563f2e',
  // Yellow
  usuki: '#fad689',
  tamako: '#f9bf45',
  kuwacha: '#c99833',
  shirotsurubami: '#dcb879',
  karashi: '#caad5f',
  yamabuki: '#ffb11b',
  yamabukicha: '#d19826',
  kigaracha: '#c18a26',
  kobicha: '#876633',
  // Green
  hiwa: '#bec23f',
  koke: '#838a2d',
  uguis: '#6c6a2d',
  // Blue
  kamenosoki: '#a5dee4',
  mizu: '#81c7d4',
  sora: '#58b2dc',
  asagi: '#33a6b8',
  chigusa: '#3a8fb7',
  ruri: '#005caf',
  konjyo: '#113285',
  // Purple
  usu: '#b28fce',
  fuji: '#8bb1c3',
  hashita: '#986db2',
  shion: '#8f77b5',
  fujimurasaki: '#8a6bbe',
  kikyo: '#6a4c9c',
  sumire: '#66327c',
  murasaki: '#592c63',
  kokimurasaki: '#4a225d',
  shikon: '#3c2f41',
  kurobeni: '#3f2b36',
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
