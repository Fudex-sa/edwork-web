import createApiActions from '~helpers/createApiActions';
import { POST_DETAILS } from './constants';

const getPostDetails = (id, options = {}) =>
  createApiActions({
    type: POST_DETAILS,
    url: `company/post/${id}`,
    requestOption: {
      method: 'get',
    },
    success: options.success,
    fail: options.fail,
  })(id, true);

export default getPostDetails;
