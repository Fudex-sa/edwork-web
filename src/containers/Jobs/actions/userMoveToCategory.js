import createApiActions from '~helpers/createApiActions';
import { USER_MOVE_CATEGORY } from './constants';

const userMoveToCategory = (data, options = {}) =>
  createApiActions({
    type: USER_MOVE_CATEGORY,
    url: '/post/detail/user/move',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default userMoveToCategory;
