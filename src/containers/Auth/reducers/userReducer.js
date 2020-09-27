import {
  RESEND_VALIDATION,
  BLOCK_USER,
  UNBLOCK_USER,
  INVITE_ADMIN_USER,
  FORGET_PASSWORD,
  UPDATE_PASSWORD,
  ACTIVATE_USER
} from "../actions/constants";

const initialState = {
  resendValidationLoading: 0,
  blockUserLoading: 0,
  unblockUserLoading: 0,
  inviteUserLoading: 0,
  forgetPasswordLoading: 0,
  updatePasswordLoading: 0,
  activateUserLoading: 1
};

const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case RESEND_VALIDATION:
      return { ...state, resendValidationLoading: 1 };
    case `${RESEND_VALIDATION}_SUCCESS`:
      return {
        ...state,
        resendValidationLoading: 0
      };
    case `${RESEND_VALIDATION}_FAIL`:
      return { ...state, resendValidationLoading: 0 };

    // Block user
    case BLOCK_USER:
      return { ...state, blockUserLoading: 1 };
    case `${BLOCK_USER}_SUCCESS`:
      return {
        ...state,
        blockUserLoading: 0
      };
    case `${BLOCK_USER}_FAIL`:
      return { ...state, blockUserLoading: 0 };

    // Block user
    case UNBLOCK_USER:
      return { ...state, unblockUserLoading: 1 };
    case `${UNBLOCK_USER}_SUCCESS`:
      return {
        ...state,
        unblockUserLoading: 0
      };
    case `${UNBLOCK_USER}_FAIL`:
      return { ...state, unblockUserLoading: 0 };

    // Invite admin user
    case INVITE_ADMIN_USER:
      return { ...state, inviteUserLoading: 1 };
    case `${INVITE_ADMIN_USER}_SUCCESS`:
      return {
        ...state,
        inviteUserLoading: 0
      };
    case `${INVITE_ADMIN_USER}_FAIL`:
      return { ...state, inviteUserLoading: 0 };

    // forget password
    case FORGET_PASSWORD:
      return { ...state, forgetPasswordLoading: 1 };
    case `${FORGET_PASSWORD}_SUCCESS`:
      return {
        ...state,
        forgetPasswordLoading: 0
      };
    case `${FORGET_PASSWORD}_FAIL`:
      return { ...state, forgetPasswordLoading: 0 };

    // update password
    case UPDATE_PASSWORD:
      return { ...state, updatePasswordLoading: 1 };
    case `${UPDATE_PASSWORD}_SUCCESS`:
      return {
        ...state,
        updatePasswordLoading: 0
      };
    case `${UPDATE_PASSWORD}_FAIL`:
      return { ...state, updatePasswordLoading: 0 };

    // update password
    case ACTIVATE_USER:
      return { ...state, activateUserLoading: 1 };
    case `${ACTIVATE_USER}_SUCCESS`:
      return {
        ...state,
        activateUserLoading: 0
      };
    case `${ACTIVATE_USER}_FAIL`:
      return { ...state, activateUserLoading: 0 };

    default:
      return state;
  }
};

export default userReducer;
