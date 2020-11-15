import createApiActions from '~helpers/createApiActions';
import { GET_JOB_APPLICANTS } from './constants';

const getJobApplicants= (id, options = {}) =>
  createApiActions({
    type: GET_JOB_APPLICANTS,
    url: `/post/detail/applicants/${id}`,
    requestOption: {
      method: 'get',
    },
    success: options.success,
    fail: options.fail,
  })(id, true);

export default getJobApplicants;
