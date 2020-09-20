import {
  COMPANY_ADMIN_LIST,
  CHANGE_USER_BLOCK_PARAMS,
  GET_WEBSITE_FRAME,
  SET_WEBSITE_FRAME,
  CHECK_SMS_CODE,
  SEND_SMS_CODE,
  VERIFICATION_COMPANY,
} from '../actions/constants';

const initialState = {
  adminListLoading: 0,
  adminList: [],
  isLoadingWebsiteFrameSetData: 0,
  isLoadingWebsiteFrame: 0,
  websiteFrameData: {},
  isSmsCodeSendLoading: 0,
  isSmsCodeVerificationLoading: 0,
  isVerificationCompanyLodaing: 0,
};

const dashboardReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    // Company admin list
    case COMPANY_ADMIN_LIST:
      return { ...state, adminListLoading: 1 };
    case `${COMPANY_ADMIN_LIST}_SUCCESS`:
      return {
        ...state,
        adminListLoading: 0,
        adminList: payload,
      };
    case `${COMPANY_ADMIN_LIST}_FAIL`:
      return { ...state, adminListLoading: 0 };

    // get website frame
    case GET_WEBSITE_FRAME:
      return { ...state, isLoadingWebsiteFrame: 1 };
    case `${GET_WEBSITE_FRAME}_SUCCESS`:
      return {
        ...state,
        isLoadingWebsiteFrame: 0,
        websiteFrameData: payload,
      };
    case `${GET_WEBSITE_FRAME}_FAIL`:
      return { ...state, isLoadingWebsiteFrame: 0 };

    // get website frame
    case SET_WEBSITE_FRAME:
      return { ...state, isLoadingWebsiteFrameSetData: 1 };
    case `${SET_WEBSITE_FRAME}_SUCCESS`:
      return {
        ...state,
        isLoadingWebsiteFrameSetData: 0,
      };
    case `${SET_WEBSITE_FRAME}_FAIL`:
      return { ...state, isLoadingWebsiteFrameSetData: 0 };

    // check sms code
    case CHECK_SMS_CODE:
      return { ...state, isSmsCodeVerificationLoading: 1 };
    case `${CHECK_SMS_CODE}_SUCCESS`:
      return {
        ...state,
        isSmsCodeVerificationLoading: 0,
      };
    case `${CHECK_SMS_CODE}_FAIL`:
      return { ...state, isSmsCodeVerificationLoading: 0 };

    // send sms code
    case SEND_SMS_CODE:
      return { ...state, isSmsCodeSendLoading: 1 };
    case `${SEND_SMS_CODE}_SUCCESS`:
      return {
        ...state,
        isSmsCodeSendLoading: 0,
      };
    case `${SEND_SMS_CODE}_FAIL`:
      return { ...state, isSmsCodeSendLoading: 0 };

    // verification company
    case VERIFICATION_COMPANY:
      return { ...state, isVerificationCompanyLodaing: 1 };
    case `${VERIFICATION_COMPANY}_SUCCESS`:
      return {
        ...state,
        isVerificationCompanyLodaing: 0,
      };
    case `${VERIFICATION_COMPANY}_FAIL`:
      return { ...state, isVerificationCompanyLodaing: 0 };

    case CHANGE_USER_BLOCK_PARAMS:
      return { ...state, adminList: payload };

    default:
      return state;
  }
};

export default dashboardReducer;
