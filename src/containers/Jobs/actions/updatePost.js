import createApiActions from '~helpers/createApiActions';
import { UPDATE_POST } from './constants';

const stopPost = (data, options = {}) =>
  createApiActions({
    type: UPDATE_POST,
    url: '/company/post/stop',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default stopPost;
