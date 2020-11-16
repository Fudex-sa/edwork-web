import createApiActions from '~helpers/createApiActions';
import { CREATE_SPONSER } from './constants';

const createSponserd = (data, options = {}) =>
  createApiActions({
    type: CREATE_SPONSER,
    url: '/company/admin/sponserd',
    requestOption: {
      method: 'post',
    },
    success: options.success,
    fail: options.fail,
  })(data,true);

export default createSponserd;
