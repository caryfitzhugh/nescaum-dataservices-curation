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
import {BrowserRouter} from 'react-router-dom'

// Features / Reducers
import { searchReducer } from './search/reducers';
import { curateReducer } from './curate/reducers';

import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

const reducer = combineReducers({
  search: searchReducer,
  curate: curateReducer,
});

const store = createStore(reducer,
    applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
                  <BrowserRouter>
                    <App/ >
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));
registerServiceWorker();
