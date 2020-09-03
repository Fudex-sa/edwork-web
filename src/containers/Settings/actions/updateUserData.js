import createApiActions from '~helpers/createApiActions';
import { UPDATE_ACCOUNT_DATA } from './constants';

const updateUserData = (data, options = {}) =>
  createApiActions({
    type: UPDATE_ACCOUNT_DATA,
    url: '/company/admin/update',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default updateUserData;
