import {SET_REGISTRATION_DATA, CLEAR_REGISTRATION_DATA} from './constants';

const setRegistrationData = data => disptach => {
  if (data === null) {
    disptach({type: CLEAR_REGISTRATION_DATA});
  } else {
    disptach({type: SET_REGISTRATION_DATA, payload: data});
  }
};

export default setRegistrationData;
