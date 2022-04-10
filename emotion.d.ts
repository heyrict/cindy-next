import '@emotion/react';
import { themeType } from './theme/types';

declare module '@emotion/react' {
  export interface Theme extends themeType {}
}
