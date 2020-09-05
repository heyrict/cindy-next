/*
 * controllers/user.js
 *
 * Controllers for authenticating users.
 *
 */

import { User } from '../db/schema';
import rasha from 'rasha';
import { publicKey } from '../config/jwt';
import { randomSalt, encodePassword } from '../db/encode';
import { getJwt, localAuth, bearerAuth, formatCookie } from '../db/auth';

import { CindyRole } from 'globalTypes';
import { Request, Response } from 'express';

const SPACE_ONLY_REGEX = RegExp('^[ 　]*$');

/**
 * Sends the JWT key set
 */
export const getJwks = async (_req: Request, res: Response) => {
  const rashaKeys = await rasha.import({ pem: publicKey, public: true });
  const jwk = {
    ...rashaKeys,
    alg: 'RS256',
    use: 'sig',
    kid: publicKey,
  };
  const jwks = {
    keys: [jwk],
  };
  res.setHeader('Content-Type', 'application/json');
  /* eslint-disable-next-line prefer-template */
  res.send(JSON.stringify(jwks, null, 2) + '\n');
  // handleResponse(res, 200, jwks);
};

/**
 * Sign in using username and password and returns JWT
 */
export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const errors = [];
  if (!username) {
    errors.push({ type: 'InvalidField', message: 'Username is not valid' });
  }
  if (!password) {
    errors.push({ type: 'InvalidField', message: 'Password cannot be blank' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const ip = get_ip(req);
    const jwt = await localAuth(username, password, ip || '');
    res.set({
      'Set-Cookie': formatCookie('cindy-jwt-token', jwt),
    });
    return handleResponse(res, 200, { jwt });
  } catch (error) {
    return handleResponse(res, 400, {
      errors: [{ type: 'AuthenticationFailed', message: error.message }],
    });
  }
};

/**
 * POST /signup
 * Create a new local account
 */
export const postSignup = async (req: Request, res: Response) => {
  const { nickname, username, password } = req.body;
  const errors = [];
  if (SPACE_ONLY_REGEX.test(nickname)) {
    errors.push({ type: 'InvalidField', message: 'Nickname cannot be blank' });
  }
  if (SPACE_ONLY_REGEX.test(username)) {
    errors.push({ type: 'InvalidField', message: 'Username cannot be blank' });
  }
  if (SPACE_ONLY_REGEX.test(password)) {
    errors.push({ type: 'InvalidField', message: 'Password cannot be blank' });
  }
  if (nickname.length >= 32) {
    errors.push({
      type: 'InvalidField',
      message: 'Nickname should be at most 32 characters',
    });
  }
  if (username.length >= 32) {
    errors.push({
      type: 'InvalidField',
      message: 'Username should be at most 32 characters',
    });
  }
  if (password.length <= 6) {
    errors.push({
      type: 'InvalidField',
      message: 'Password must be at least 6 characters long',
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const salt = randomSalt();
    const encoded = await encodePassword(req.body.password, salt, 100000);
    const user = await User.create({
      username: req.body.username,
      nickname: req.body.nickname,
      password: encoded,
    });

    const ip = get_ip(req);
    console.log(`[${ip}] Signup -> user:${user.id} (${user.nickname})`);
    const jwt = getJwt(user);
    res.set({
      'Set-Cookie': formatCookie('cindy-jwt-token', jwt),
    });
    return handleResponse(res, 200, { jwt });
  } catch (error) {
    return handleResponse(res, 400, {
      errors: [{ type: 'DBError', message: error.message }],
    });
  }
};

export const getWebhook = async (req: Request, res: Response) => {
  try {
    const bearer = req.headers.authorization;
    const requestedRole = req.headers['x-hasura-role'] as CindyRole;
    if (!bearer) {
      return handleResponse(res, 200, { 'X-Hasura-Role': 'anonymous' });
    }
    const token = bearer.slice(7);
    const user = await bearerAuth(token, requestedRole);
    const ip = get_ip(req);
    console.log(`[${ip}] Auth -> user:${user['x-hasura-user-id']}`);
    return handleResponse(res, 200, user);
  } catch (error) {
    return handleResponse(res, 401, {
      errors: [{ type: 'InternalServerError', message: error.message }],
    });
  }
};

const get_ip = (req: Request) => {
  return req.headers['x-real_ip'] || req.connection.remoteAddress;
};

function handleResponse(
  res: Response,
  code: number,
  statusMsg: string | object,
) {
  res.status(code).json(statusMsg);
}
