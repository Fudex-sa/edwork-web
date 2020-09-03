import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { multiClientMiddleware } from "redux-axios-middleware";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import { server } from "~configs/request";
import reduxStorageMiddleware from "~helpers/middleware/reduxStoreMiddleware";
import { createBrowserHistory as createHistory } from "history";

const serverConnection = {
  default: {
    client: server,
  },
};

export const history = createHistory();
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer(history),
  composeEnhancer(
    applyMiddleware(
      thunk,
      logger,
      // localStorageMiddleware,
      reduxStorageMiddleware,
      routerMiddleware(history),
      multiClientMiddleware(serverConnection)
    )
  )
);

if (process.env.NODE_ENV !== "production") window.store = store;
store.dispatch({ type: "@@redux/INIT" });
