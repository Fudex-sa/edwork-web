import createApiActions from '~helpers/createApiActions';
import { SET_WEBSITE_FRAME } from './constants';

const setFrameData = (data, options = {}) =>
  createApiActions({
    type: SET_WEBSITE_FRAME,
    url: '/post/iframe/create',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default setFrameData;
