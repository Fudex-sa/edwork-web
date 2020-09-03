import createApiActions from '~helpers/createApiActions';
import { CHECK_PAYMENT } from './constants';

const checkPayment = (data, options = {}, token) =>
  createApiActions({
    type: CHECK_PAYMENT,
    url: '/company/payment/check',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, token || true);

export default checkPayment;
