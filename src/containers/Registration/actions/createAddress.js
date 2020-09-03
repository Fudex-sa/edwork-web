import createApiActions from '~helpers/createApiActions';
import { CREATE_ADDRESS } from './constants';

const createAddress = (data, options = {}) =>
  createApiActions({
    type: CREATE_ADDRESS,
    url: '/company/post/create/address',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default createAddress;
