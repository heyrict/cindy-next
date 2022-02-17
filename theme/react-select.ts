import { themeType } from './types';

const getReactSelectTheme = (theme: themeType) => ({
  spacing: {
    baseUnit: 4,
    controlHeight: 0,
    menuGutter: 4,
  },
  colors: {
    primary: theme.colors.blue[6],
    primary75: theme.colors.blue[5],
    primary50: theme.colors.blue[3],
    primary25: theme.colors.blue[2],

    danger: theme.colors.pink[6],
    dangerLight: theme.colors.pink[3],

    neutral0: theme.colors.gray[0],
    neutral5: theme.colors.gray[0],
    neutral10: theme.colors.gray[1],
    neutral20: theme.colors.gray[2],
    neutral30: theme.colors.gray[3],
    neutral40: theme.colors.gray[4],
    neutral50: theme.colors.gray[5],
    neutral60: theme.colors.gray[6],
    neutral70: theme.colors.gray[7],
    neutral80: theme.colors.gray[8],
    neutral90: theme.colors.gray[9],
  },
  borderRadius: 4,
});

export default getReactSelectTheme;
