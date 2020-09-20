import createApiActions from '~helpers/createApiActions';
import { INVITE_ADMIN_USER } from './constants';

const inviteAdminUser = (data, options = {}) =>
  createApiActions({
    type: INVITE_ADMIN_USER,
    url: '/company/admin/invite',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default inviteAdminUser;
