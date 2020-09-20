import createApiActions from '~helpers/createApiActions';
import { GET_JOB_LIST } from './constants';

const getJobsList = (data, options = {}) =>
  createApiActions({
    type: GET_JOB_LIST,
    url: '/company/post/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getJobsList;
