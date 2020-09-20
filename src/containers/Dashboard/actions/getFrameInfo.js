import createApiActions from '~helpers/createApiActions';
import { GET_WEBSITE_FRAME } from './constants';

const getFrameInfo = (data, options = {}) =>
  createApiActions({
    type: GET_WEBSITE_FRAME,
    url: '/post/iframe/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data);

export default getFrameInfo;
