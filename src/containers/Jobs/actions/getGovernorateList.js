import createApiActions from '~helpers/createApiActions';
import { GET_GOVERNORATE_LIST } from './constants';

const getGovernorateList = (data, options = {}) =>
  createApiActions({
    type: GET_GOVERNORATE_LIST,
    url: '/user/governate/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getGovernorateList;
