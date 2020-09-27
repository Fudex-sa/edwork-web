import {
  GET_REGION,
  SET_REGISTRATION_DATA,
  SET_GOVERNORATES,
  CLEAR_REGISTRATION_DATA,
  CREATE_ADDRESS,
  CREATE_COMPANY,
} from '../actions/constants';

const initialState = {
  registrationData: {},
  tempToken: null,
  createCompanyLoading: 0,
  createAddressLoading: 0,
  isLoadingRegion: 1,
  regions: [],
  governorates: [],
};

const registrationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_REGISTRATION_DATA:
      return {
        ...state,
        registrationData: { ...state.registrationData, ...payload },
      };
    case CLEAR_REGISTRATION_DATA:
      return { ...state, registrationData: {} };

    case SET_GOVERNORATES:
      return { ...state, governorates: payload };

    // Get region
    case GET_REGION:
      return { ...state, isLoadingRegion: 1 };
    case `${GET_REGION}_SUCCESS`:
      return {
        ...state,
        isLoadingRegion: 0,
        regions: payload,
      };
    case `${GET_REGION}_FAIL`:
      return { ...state, isLoadingRegion: 0 };

    // Get region
    case CREATE_ADDRESS:
      return { ...state, createAddressLoading: 1 };
    case `${CREATE_ADDRESS}_SUCCESS`:
      return {
        ...state,
        createAddressLoading: 0,
      };
    case `${CREATE_ADDRESS}_FAIL`:
      return { ...state, createAddressLoading: 0 };

    // registration user
    case CREATE_COMPANY:
      return { ...state, createCompanyLoading: 1 };
    case `${CREATE_COMPANY}_SUCCESS`:
      return {
        ...state,
        createCompanyLoading: 0,
        tempToken: payload.token,
      };
    case `${CREATE_COMPANY}_FAIL`:
      return { ...state, createCompanyLoading: 0 };

    default:
      return state;
  }
};

export default registrationReducer;
