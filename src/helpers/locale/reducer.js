import { SET_LOCALE } from './actions';

const initialState = {
  lang: 'en',
};

const locale = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default locale;
