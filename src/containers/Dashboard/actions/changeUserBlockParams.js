import { CHANGE_USER_BLOCK_PARAMS } from './constants';

const changeUserBlockParams = (userId, objectParams = {}) => (
  disptach,
  getState
) => {
  const storage = getState();
  // console.warn(storage.dashboard.adminList, userId, blockState);
  const adminList = storage.dashboard.adminList.map((item) => {
    if (item.id === userId) {
      return { ...item, ...objectParams };
    } else return item;
  });
  // console.warn(adminList, userId, blockState);
  disptach({ type: CHANGE_USER_BLOCK_PARAMS, payload: adminList });
};

export default changeUserBlockParams;
