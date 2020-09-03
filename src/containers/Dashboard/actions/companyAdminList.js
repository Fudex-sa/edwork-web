import createApiActions from '~helpers/createApiActions';
import { COMPANY_ADMIN_LIST } from './constants';

const companyAdminList = (data, options = {}) =>
  createApiActions({
    type: COMPANY_ADMIN_LIST,
    url: '/company/admin/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(null, true);

export default companyAdminList;
