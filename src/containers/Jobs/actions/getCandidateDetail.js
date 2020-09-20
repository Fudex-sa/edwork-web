import createApiActions from '~helpers/createApiActions';
import { GET_CANDIDATE_DETAIL } from './constants';

const getCandidateDetail = (data, options = {}) =>
  createApiActions({
    type: GET_CANDIDATE_DETAIL,
    url: '/post/detail/users/detail',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getCandidateDetail;
