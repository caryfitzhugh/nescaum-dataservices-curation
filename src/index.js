import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Setup
import { createStore, combineReducers } from 'redux';
import registerServiceWorker from './registerServiceWorker';

// Routing
import {BrowserRouter} from 'react-router-dom'

// Features / Reducers
import { searchReducer } from './search/reducers';
import { curateReducer } from './curate/reducers';

const reducer = combineReducers({
  search: searchReducer,
  curate: curateReducer,
});

const store = createStore(reducer)

ReactDOM.render(<BrowserRouter>
                  <App/ >
                </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
