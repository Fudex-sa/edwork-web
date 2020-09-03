import createApiActions from '~helpers/createApiActions';
import { CREATE_COMPANY } from './constants';

const createCompany = (data, options = {}) =>
  createApiActions({
    type: CREATE_COMPANY,
    url: '/company/register',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data);

export default createCompany;
