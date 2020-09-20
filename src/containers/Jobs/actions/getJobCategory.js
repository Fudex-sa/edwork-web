import createApiActions from '~helpers/createApiActions';
import { GET_JOB_CATEGORY } from './constants';

const getJobCategory = (data, options = {}) =>
  createApiActions({
    type: GET_JOB_CATEGORY,
    url: '/company/post/categories',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getJobCategory;
