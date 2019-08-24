import { getCookie } from './cookie';
import { CindyJWTDeclaration, CindyJWTClaims } from 'globalTypes';

export const getAuthToken = (cookie?: string) =>
  getCookie('cindy-jwt-token', cookie);

export const parseAuthToken = (
  token: string,
): { dcl: CindyJWTDeclaration; clm: CindyJWTClaims; sig: string } => {
  const parsed = token.split('.');
  if (parsed.length !== 3) {
    throw Error('Invalid auth token');
  }
  let dcl, clm;
  if (process.browser) {
    dcl = JSON.parse(atob(parsed[0]));
    clm = JSON.parse(
      decodeURIComponent(
        atob(parsed[1].replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map(
            (c: string) =>
              '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
          )
          .join(''),
      ),
    );
  } else {
    dcl = JSON.parse(Buffer.from(parsed[0], 'base64').toString());
    clm = JSON.parse(Buffer.from(parsed[1], 'base64').toString());
  }
  const sig = parsed[2];
  return { dcl, clm, sig };
};

export const getUser = (cookie?: string) => {
  try {
    const token = getAuthToken(cookie);
    if (token) return parseAuthToken(token).clm.user;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
