import createApiActions from '~helpers/createApiActions';
import { STOP_POST } from './constants';

const stopPost = (data, options = {}) =>
  createApiActions({
    type: STOP_POST,
    url: '/company/post/stop',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default stopPost;
