import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider} from 'react-redux';

// Setup
import { applyMiddleware, createStore, combineReducers } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

// Routing
import {HashRouter} from 'react-router-dom'

// Features / Reducers
import { searchReducer } from './search/reducers';
import { createReducer } from './create/reducers';
import { editReducer } from './edit/reducers';
import { resourcesReducer } from './resources/reducers';

import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

const reducer = combineReducers({
  resources: resourcesReducer,
  search: searchReducer,
  create: createReducer,
  edit: editReducer,
});

const store = createStore(reducer,
    applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
                  <HashRouter>
                    <App/ >
                  </HashRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
