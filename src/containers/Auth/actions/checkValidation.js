import createApiActions from '~helpers/createApiActions';
import { TOKEN_VALIDATE } from './constants';
import { extractSession, saveSession, clearSession } from '~helpers/session';

const checkValidation = ({ token }, options = {}) =>
  createApiActions({
    type: TOKEN_VALIDATE,
    url: '/company/admin/check',
    requestOption: {
      method: 'post',
    },
    success: (response) => {
      const storage = extractSession();
      storage.auth.user = response.data;
      storage.auth.token = token;
      saveSession(storage);

      if (options.success) options.success(response);
    },
    fail: (response) => {
      clearSession();
      if (options.fail) options.fail(response);
    },
  })(null, token, true);

export default checkValidation;
