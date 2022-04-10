import theme from './theme';

export enum ThemesEnum {
  LIGHT = 0,
  DARK = 1,
}

export type themeType = typeof theme & {
  theme: ThemesEnum;
  [key: string]: any;
};
