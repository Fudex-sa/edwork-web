import {SET_GOVERNORATES} from './constants';

const setGovernorates = data => disptach => {
  disptach({type: SET_GOVERNORATES, payload: data});
};

export default setGovernorates;
