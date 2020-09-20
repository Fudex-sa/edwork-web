import createApiActions from '~helpers/createApiActions';
import { UPDATE_ACCOUNT_DATA } from './constants';

const updateCompanyData = (data, options = {}) =>
  createApiActions({
    type: UPDATE_ACCOUNT_DATA,
    url: '/company/update',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default updateCompanyData;
