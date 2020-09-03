import { SET_JOB_DATA, CLEAR_JOB_DATA } from "./constants";

const setJobAddData = (data) => (disptach) => {
  if (data === null) {
    disptach({ type: CLEAR_JOB_DATA });
  } else {
    disptach({ type: SET_JOB_DATA, payload: data });
  }
};

export default setJobAddData;
