import createApiActions from '~helpers/createApiActions';
import { RESEND_VALIDATION } from './constants';

const resendValidation = (data, options = {}) =>
  createApiActions({
    type: RESEND_VALIDATION,
    url: '/company/admin/resend/email',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default resendValidation;
