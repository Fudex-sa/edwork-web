import createApiActions from '~helpers/createApiActions';
import { CHECK_SMS_CODE } from './constants';

const checkSmsCode = (data, options = {}) =>
  createApiActions({
    type: CHECK_SMS_CODE,
    url: '/company/verification/check',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default checkSmsCode;
