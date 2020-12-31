/*
 * db/auth.js
 *
 * JWT Authorization mock as a replacement of passportjs.
 *
 */

import * as jwt from 'jsonwebtoken';
import * as jwtConfig from '../config/jwt';

import { User, AuthGroup } from './schema';
import { comparePassword } from './encode';

import { CindyRole, CindyJWTClaims } from '../../globalTypes';

export const getRoles = (user: any) => {
  if (user.isSuperuser) {
    return ['admin', 'user'];
  } else if (user.isStaff) {
    return ['staff', 'user'];
  }
  return ['user'];
};

export const getClaims = (user: any, reqRole?: CindyRole) => {
  let defaultRole: CindyRole = 'user';
  const authGroups = user.auth_groups || [];
  const roles = getRoles(user).concat(authGroups.map((ag: any) => ag.name));

  if (reqRole && roles.find(v => v === reqRole)) {
    defaultRole = reqRole;
  }

  return {
    'x-hasura-role': defaultRole,
    'x-hasura-user-id': `${user.id}`,
    'cache-control': 'max-age=3000',
  };
};

export const getJwt = (user: any): string => {
  const claim = {
    user: {
      id: user.id,
      icon: user.icon,
      username: user.username,
      nickname: user.nickname,
    },
    iat: Math.floor(Date.now() / 1000),
    'https://www.cindythink.com/jwt/claims': getClaims(user),
  };
  const signOptions = {
    subject: `User-${user.id}`,
    expiresIn: '30d', // 30 days validity
    algorithm: 'RS256',
  };
  const JWT = jwt.sign(claim, jwtConfig.key, signOptions);
  return JWT;
};

export const formatCookie = (
  c_name: string,
  c_value: string,
  c_expiry = 86400 * 30 /* seconds */,
  c_path = '/',
  http_only = false,
) => {
  const path_str = `;path=${c_path}`;
  const http_only_str = http_only ? ';HttpOnly' : '';

  let expiry_str = '';
  if (c_expiry) {
    let expiry_date = new Date();
    expiry_date.setTime(expiry_date.getTime() + c_expiry * 1000);
    expiry_str = `;Expires=${expiry_date.toUTCString()};Max-Age=${c_expiry}`;
  }

  return `${c_name}=${c_value}${expiry_str}${path_str}${http_only_str}`;
};

export async function localAuth(
  username: string,
  password: string,
  ip: string | string[],
) {
  const user = await User.findOne({
    where: { username },
    include: [AuthGroup],
  });
  if (!user) {
    throw Error('User not existing');
  }
  if (!user.isActive) {
    throw Error('User is inactive');
  }
  const passwordCorrect = await comparePassword(password, user.password);
  if (!passwordCorrect) {
    throw Error('Invalid password');
  }

  // Update last_login value
  await user.changed('last_login', true);
  await user.save();

  console.log(`[${ip}] Login -> user:${user.id} (${user.nickname})`);
  const Jwt = getJwt(user);
  return Jwt;
}

export async function bearerAuth(token: string, reqRole: CindyRole) {
  const parsed = await new Promise<CindyJWTClaims>((resolve, reject) => {
    jwt.verify(
      token,
      jwtConfig.publicKey,
      { algorithms: ['RS256'] },
      (err, decoded) =>
        err ? reject(err) : resolve(decoded as CindyJWTClaims),
    );
  });
  const userId =
    parsed['https://www.cindythink.com/jwt/claims']['x-hasura-user-id'];
  const user = await User.findByPk(userId, { include: [AuthGroup] });
  if (!user) {
    throw Error('Invalid Token');
  }
  if (!user.isActive) {
    throw Error('User is inactive');
  }
  return getClaims(user, reqRole);
}
