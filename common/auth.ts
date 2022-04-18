import { getCookie } from './cookie';
import { CindyJWTDeclaration, CindyJWTClaims } from 'globalTypes';
import { Buffer } from 'buffer';

export const getAuthToken = (cookie?: string) =>
  getCookie('cindy-jwt-token', cookie);

export const getAdminAuthToken = (cookie?: string) =>
  getCookie('cindy-admin-token', cookie);

export const parseAuthToken = (
  token: string,
): { dcl: CindyJWTDeclaration; clm: CindyJWTClaims; sig: string } => {
  const parsed = token.split('.');
  if (parsed.length !== 3) {
    throw Error('Invalid auth token');
  }
  let dcl, clm;
  dcl = JSON.parse(Buffer.from(parsed[0], 'base64').toString());
  clm = JSON.parse(Buffer.from(parsed[1], 'base64').toString());
  const sig = parsed[2];
  return { dcl, clm, sig };
};

type GetUserOption = Partial<{
  admin: boolean;
}>;

export const getClaims = (cookie?: string, options: GetUserOption = {}) => {
  const { admin } = options;
  try {
    const token = admin ? getAdminAuthToken(cookie) : getAuthToken(cookie);
    if (token) return parseAuthToken(token).clm;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUser = (cookie?: string, options: GetUserOption = {}) => {
  const claims = getClaims(cookie, options);
  return claims?.user;
};
