import createApiActions from '~helpers/createApiActions';
import { GET_NATIONALITY_LIST } from './constants';

const getNationalityList = (data, options = {}) =>
  createApiActions({
    type: GET_NATIONALITY_LIST,
    url: '/user/nationality/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getNationalityList;
