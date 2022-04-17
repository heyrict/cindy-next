// in src/LoginPage.js
import * as React from 'react';
import { useLogin, useNotify } from 'react-admin';
import { getClaims } from 'common/auth';

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();

  const handleLogin = () => {
    login({ role: 'Staff' }).catch(() => notify('Invalid email or password'));
  };
  const claims = getClaims();

  return claims &&
    Array.isArray(claims.allowed_roles) &&
    claims.allowed_roles.some(role => role === 'Staff') ? (
    <button onClick={handleLogin}>Login</button>
  ) : null;
};

export default LoginPage;
