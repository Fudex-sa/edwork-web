import createApiActions from '~helpers/createApiActions';
import { GET_YEARS } from './constants';

const getYears = (data, options = {}) =>
  createApiActions({
    type: GET_YEARS,
    url: '/post/years',
    requestOption: {
      method: 'get',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getYears;
