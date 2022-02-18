import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThemesEnum } from 'theme/types';
import { initialState as settingsInitialState } from '../reducers/setting';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const settings: typeof settingsInitialState =
    JSON.parse(req.cookies['settings-server-side'] || '{}') ||
    settingsInitialState;

  // Theme SSG
  // Reference: https://github.com/VulcanJS/vulcan-next/blob/devel/src/pages/vn/examples/%5BM%5D/megaparam-demo.tsx
  const theme = settings['theme'] || ThemesEnum.LIGHT;
  if (!url.pathname.startsWith('/static')) {
    url.pathname = `/${theme}${url.pathname}`;
  }
  const res = NextResponse.rewrite(url);

  return res;
}
