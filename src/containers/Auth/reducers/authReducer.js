import {
  AUTH_COMPANY,
  TOKEN_VALIDATE,
  LOGOUT,
  GET_SPONSERD,
  CREATE_SPONSER,
} from "../actions/constants";

const initialState = {
  authLoading: 0,
  authenticated: 0,
  authenticating: 0,
  token: null,
  user: null,
  sponserd: [],
};

const authReducer = (state = initialState, { payload, type, token }) => {
  switch (type) {
    case LOGOUT:
      return {
        ...state,
        authenticating: 0,
        authenticated: 0,
        token: null,
        user: null,
      };

    case AUTH_COMPANY:
      return { ...state, authLoading: 1 };
    case `${AUTH_COMPANY}_SUCCESS`:

    case `${CREATE_SPONSER}_SUCCESS`:
      return { ...state, sponserd: [...state.sponserd, payload.company] };
    case `${AUTH_COMPANY}_SUCCESS`:
      return {
        ...state,
        authLoading: 0,
        authenticated: 1,
        token: payload.token,
        user: payload.user || {},
      };
    case `${AUTH_COMPANY}_FAIL`:
      return { ...state, authLoading: 0, authenticated: 0 };

    case `${GET_SPONSERD}_SUCCESS`:
      return { ...state, sponserd: payload.companies || [] };
    case TOKEN_VALIDATE:
      return { ...state, authenticated: 0, authenticating: 1 };
    case `${TOKEN_VALIDATE}_SUCCESS`:
      return {
        ...state,
        authenticated: 1,
        authenticating: 0,
        token: token,
        user: payload || {},
      };
    case `${TOKEN_VALIDATE}_FAIL`:
      return { ...state, authLoading: 0, authenticated: 0, authenticating: 0 };

    default:
      return state;
  }
};

export default authReducer;
