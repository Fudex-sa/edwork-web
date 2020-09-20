import createApiActions from '~helpers/createApiActions';
import { GET_REGION } from './constants';

const getRegion = () =>
  createApiActions({
    type: GET_REGION,
    url: '/user/regions/list',
    requestOption: {
      method: 'post',
    },
  })();

export default getRegion;
