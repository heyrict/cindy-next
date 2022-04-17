import { toast } from 'react-toastify';
import { WEBHOOK_SERVER } from 'settings';
import { setCookie } from 'common/cookie';

import { webhookPost } from 'components/Auth/webhook';
import { AuthProvider } from 'react-admin';
import { getClaims, getUser } from 'common/auth';

const authProvider: AuthProvider = {
  login: async ({ role }) => {
    const ENDPOINT = `${WEBHOOK_SERVER}/role_switch`;
    try {
      const res = await webhookPost(ENDPOINT, {
        role,
      });
      const { data, error } = res;
      if (!error) {
        try {
          setCookie('cindy-admin-token', data.auth_token, 30 * 24 * 60 * 60);
        } catch (e) {
          toast.error(JSON.stringify(e));
        }
      } else {
        toast.error(error);
      }
      return res;
    } catch (error_1) {
      toast.error(JSON.stringify(error_1));
    }
  },
  logout: () => {
    setCookie('cindy-admin-token', '', -100);
    return Promise.resolve();
  },
  checkAuth: () =>
    getUser(undefined, { admin: true }) ? Promise.resolve() : Promise.reject(),
  checkError: error => {
    const status = error.status;
    if (status === 401 || status === 403) {
      setCookie('cindy-admin-token', '', -100);
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () => {
    const user = getUser(undefined, { admin: true });
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject();
  },
  getPermissions: () => {
    const clms = getClaims(undefined, { admin: true });
    if (clms) {
      return Promise.resolve(clms.role);
    }
    return Promise.reject();
  },
  getRoles: () => {
    const clms = getClaims(undefined, { admin: true });
    if (clms) {
      return Promise.resolve(clms.allowed_roles);
    }
    return Promise.reject();
  },
};

export default authProvider;
