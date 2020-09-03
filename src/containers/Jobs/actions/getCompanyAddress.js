import createApiActions from '~helpers/createApiActions';
import { GET_COMPANY_ADDRESS } from './constants';

const getCompanyAddress = (data, options = {}) =>
  createApiActions({
    type: GET_COMPANY_ADDRESS,
    url: '/company/post/list/address',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(null, true);

export default getCompanyAddress;
