import createApiActions from '~helpers/createApiActions';
import { GET_PLANS } from './constants';

const getPlans = (data, options = {}) =>
  createApiActions({
    type: GET_PLANS,
    url: '/company/plan/',
    requestOption: {
      method: 'get',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getPlans;
