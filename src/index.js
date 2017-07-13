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
import { searchReducer } from './resources/search/reducers';
import { createReducer } from './resources/create/reducers';
import { editReducer } from './resources/edit/reducers';
import { resourcesReducer } from './resources/reducers';
import { unindexedReducer } from './resources/unindexed/reducers';

import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

const reducer = combineReducers({
  resources: resourcesReducer,
  resources_unindexed: unindexedReducer,
  resources_search: searchReducer,
  resources_create: createReducer,
  resources_edit: editReducer,
});

const store = createStore(reducer,
    applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
                  <HashRouter>
                    <App/ >
                  </HashRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
