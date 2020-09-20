import createApiActions from '~helpers/createApiActions';
import { GET_CUSTOM_CATEGORIES } from './constants';

const getCustomCategories = (data, options = {}) =>
  createApiActions({
    type: GET_CUSTOM_CATEGORIES,
    url: '/post/detail/custom/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getCustomCategories;
