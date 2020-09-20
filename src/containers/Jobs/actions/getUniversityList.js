import createApiActions from '~helpers/createApiActions';
import { GET_UNIVERSITY_LIST } from './constants';

const getUniversityList = (data, options = {}) =>
  createApiActions({
    type: GET_UNIVERSITY_LIST,
    url: '/user/university/list',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default getUniversityList;
