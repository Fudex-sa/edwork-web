import createApiActions from '~helpers/createApiActions';
import { GET_INITAIL_PAYMENT } from './constants';

const getInitalPaymentToken = (data, options = {}, token) =>
  createApiActions({
    type: GET_INITAIL_PAYMENT,
    url: '/company/payment/start',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, token || true);

export default getInitalPaymentToken;
