import createApiActions from '~helpers/createApiActions';
import { AUTH_COMPANY } from './constants';
import { saveSession, clearSession, extractSession } from '~helpers/session';

const authCompany = (data, options = {}) =>
  createApiActions({
    type: AUTH_COMPANY,
    url: '/company/admin/auth',
    requestOption: {
      method: 'post',
    },
    success: (response) => {
      const storage = extractSession();
      storage.auth = response.data;
      saveSession(storage);

      if (options.success) options.success(response);
    },
    fail: (response) => {
      clearSession();
      if (options.fail) options.fail(response);
    },
  })(data);

export default authCompany;
