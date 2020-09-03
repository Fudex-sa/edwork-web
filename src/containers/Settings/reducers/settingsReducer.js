import { UPDATE_ACCOUNT_DATA } from "../actions/constants";

const initialState = {
  accoundDataUpdateLoading: 0,
};

const settingsReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    // update user data
    case UPDATE_ACCOUNT_DATA:
      return { ...state, accoundDataUpdateLoading: 1 };
    case `${UPDATE_ACCOUNT_DATA}_SUCCESS`:
      return {
        ...state,
        accoundDataUpdateLoading: 0,
      };
    case `${UPDATE_ACCOUNT_DATA}_FAIL`:
      return { ...state, accoundDataUpdateLoading: 0 };

    default:
      return state;
  }
};

export default settingsReducer;
