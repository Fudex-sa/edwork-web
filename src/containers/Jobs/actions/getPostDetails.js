import createApiActions from '~helpers/createApiActions';
import { SET_JOB_DETAIL_DATA } from './constants';

const getPostDetails = (id, options = {}) =>
  createApiActions({
    type: SET_JOB_DETAIL_DATA,
    url: `/company/post/${id}`,
    requestOption: {
      method: 'get',
    },
    success: options.success,
    fail: options.fail,
  })(id, true);

export default getPostDetails;
