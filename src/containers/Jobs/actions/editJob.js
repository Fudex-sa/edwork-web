import createApiActions from '~helpers/createApiActions';
import { CREATE_JOB } from './constants';

const editJob = (data, options = {}) =>
  createApiActions({
    type: CREATE_JOB,
    url: '/company/post/update',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default editJob;
