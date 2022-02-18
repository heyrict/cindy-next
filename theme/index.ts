import theme from './theme';
import { GetStaticPaths } from 'next';
import { ThemesEnum } from './types';

export const themeStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { theme: ThemesEnum.LIGHT.toString() } },
    { params: { theme: ThemesEnum.DARK.toString() } },
  ],
  fallback: true,
});

export default theme;
