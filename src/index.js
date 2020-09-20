import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import './assets/styles/main.scss';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store, history } from './configureStore';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from '~configs/i18n';
import routeChangeToTop from '~helpers/routeChangeToTop';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

routeChangeToTop(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider direction={i18n.dir()}>
        <I18nextProvider i18n={i18n}>
          <ConnectedRouter history={history}>
            <Route component={App} />
          </ConnectedRouter>
        </I18nextProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
