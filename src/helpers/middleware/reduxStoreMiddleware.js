import { extractSession } from '../session';
import { replace } from 'connected-react-router';
import { message } from 'antd';
import checkValidation from '~containers/Auth/actions/checkValidation';
import logout from '~containers/Auth/actions/logout';
import { setLocale } from '../locale/actions';

const authCheck = (store) => {
  const stateStorage = extractSession();
  // set default language
  const storage = extractSession();
  const lang = storage?.lang || 'en';
  store.dispatch(setLocale(lang));

  if (stateStorage.auth && stateStorage.auth.token) {
    store.dispatch(
      checkValidation(
        { token: stateStorage.auth.token },
        {
          success: (response) => {
            // console.warn(response);
            if (response.data === null) {
              store.dispatch(
                logout(() => {
                  message.error('User something went wrong');
                  store.dispatch(replace('/'));
                })
              );
            }
          },
        }
      )
    );
  }
  if (!stateStorage.auth) {
    store.dispatch(logout());
    // logout(store.dispatch);
  }
};

const reduxStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === '@@redux/INIT') {
    authCheck(store);
  }
  return next(action);
};

export default reduxStorageMiddleware;
