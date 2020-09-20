import createApiActions from '~helpers/createApiActions';
import { SEND_SMS_CODE } from './constants';

const sendSmsCode = (data, options = {}) =>
  createApiActions({
    type: SEND_SMS_CODE,
    url: '/company/verification/send',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default sendSmsCode;
