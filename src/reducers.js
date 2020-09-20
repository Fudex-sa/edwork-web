import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { reducer as modal } from 'redux-modal';
// import { history } from "./configureStore";

import authReducer from '~containers/Auth/reducers/authReducer';
import registrationReducer from '~containers/Registration/reducers/registrationReducer';
import userReducer from '~containers/Auth/reducers/userReducer';
import dashboardReducer from '~containers/Dashboard/reducers/dashboardReducer';
import settingsReducer from '~containers/Settings/reducers/settingsReducer';
import jobsReducer from '~containers/Jobs/reducers/jobsReducer';
import locale from '~helpers/locale/reducer';

// const history = createHistory();
const rootReducer = (history) =>
  combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    jobs: jobsReducer,
    // common reducers
    forms: formReducer,
    modal,
    locale,
    router: connectRouter(history),
  });

export default rootReducer;
