import createApiActions from '~helpers/createApiActions';
import { GET_DEGREE } from './constants';

const getDegree = (data, options = {}) =>
  createApiActions({
    type: GET_DEGREE,
    url: '/user/latest/degree',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(null, true);

export default getDegree;
