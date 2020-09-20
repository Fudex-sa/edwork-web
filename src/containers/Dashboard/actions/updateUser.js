import createApiActions from '~helpers/createApiActions';
import { UPDATE_USER } from './constants';

const updateUser = (data, options = {}) =>
  createApiActions({
    type: UPDATE_USER,
    url: '/company/admin/update',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default updateUser;
