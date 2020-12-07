import createApiActions from '~helpers/createApiActions';
import { GET_JOB_TYPES } from './constants';

const getJobTypes = (data, options = {}) =>
  createApiActions({
    type: GET_JOB_TYPES,
    url: '/company/post/contract/types',
    requestOption: {
      method: 'get',
    },
    success: options.success,
    fail: options.fail,
  })(null, true);

export default getJobTypes;
