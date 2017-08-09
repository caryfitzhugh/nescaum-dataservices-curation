import immutable from "object-path-immutable";
import {  START_INDEX_GEOFOCUSES_REQUEST, FINISH_INDEX_GEOFOCUSES_REQUEST, ERROR_INDEX_GEOFOCUSES_REQUEST} from './actions';

const INITIAL_INDEX_STATE = {
  is_searching: false,
  error: null,
  geofocuses: {},
  page: 1,
  per_page: 50,
  response: {}
};

function geofocusesIndexReducer(state = INITIAL_INDEX_STATE, action) {
  switch (action.type) {
    case START_INDEX_GEOFOCUSES_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: true, response: {}, error: null});

    case FINISH_INDEX_GEOFOCUSES_REQUEST:
      let new_state = Object.assign({}, state, {page: action.page, is_searching: false, response: action.response, error: null});
      action.response.geofocuses.forEach((geofocus) => {
        new_state = immutable.set(new_state, ['geofocuses', geofocus.id], geofocus);
      });
      return new_state;

    case ERROR_INDEX_GEOFOCUSES_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: false, response: {}, error: action.error});

    default:
      return state;
  }
}

export {geofocusesIndexReducer};
