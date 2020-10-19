import { SET_JOB_DETAIL_DATA, CLEAR_JOB_DETAIL_DATA } from './constants';

const setJobDetailData = (data) => (disptach) => {
  console.log(1111111111111111111111111111111);
  console.log(data);
  if (data === null) {
    disptach({ type: CLEAR_JOB_DETAIL_DATA });
  } else {
    disptach({ type: SET_JOB_DETAIL_DATA, payload: data });
  }
};

export default setJobDetailData;
