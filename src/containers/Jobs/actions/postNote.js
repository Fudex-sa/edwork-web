import createApiActions from '~helpers/createApiActions';
import { POST_NOTE } from './constants';

const postNote = (data, options = {}) =>
  createApiActions({
    type: POST_NOTE,
    url: 'company/post/note',
    requestOption: {
      method: 'put',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default postNote;
