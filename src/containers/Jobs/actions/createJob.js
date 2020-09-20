import createApiActions from '~helpers/createApiActions';
import { CREATE_JOB } from './constants';

const createJob = (data, options = {}) =>
  createApiActions({
    type: CREATE_JOB,
    url: '/company/post/create',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default createJob;
