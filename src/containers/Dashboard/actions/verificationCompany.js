import createApiActions from '~helpers/createApiActions';
import { VERIFICATION_COMPANY } from './constants';

const verificationCompany = (data, options = {}) =>
  createApiActions({
    type: VERIFICATION_COMPANY,
    url: '/company/verification/create',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default verificationCompany;
