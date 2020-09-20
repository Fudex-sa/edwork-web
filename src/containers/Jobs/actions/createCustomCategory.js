import createApiActions from '~helpers/createApiActions';
import { CREATE_CUSTOM_CATEGORY } from './constants';

const createCustomCategory = (data, options = {}) =>
  createApiActions({
    type: CREATE_CUSTOM_CATEGORY,
    url: '/post/detail/add/custom/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default createCustomCategory;
