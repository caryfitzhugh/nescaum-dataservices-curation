//import immutable from "object-path-immutable";
import {  START_INDEX_USERS_REQUEST, FINISH_INDEX_USERS_REQUEST, ERROR_INDEX_USERS_REQUEST} from './actions';

const INITIAL_INDEX_STATE = {
  is_searching: false,
  error: null,
  page: 1,
  per_page: 50,
  response: {}
};

function usersIndexReducer(state = INITIAL_INDEX_STATE, action) {
  switch (action.type) {
    case START_INDEX_USERS_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: true, response: {}, error: null});

    case FINISH_INDEX_USERS_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: false, response: action.response, error: null});

    case ERROR_INDEX_USERS_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: false, response: {}, error: action.error});

    default:
      return state;
  }
}

export {usersIndexReducer};
