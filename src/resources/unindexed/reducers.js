//import immutable from "object-path-immutable";
import {  START_UNINDEXED_RESOURCES_REQUEST, FINISH_UNINDEXED_RESOURCES_REQUEST, ERROR_UNINDEXED_RESOURCES_REQUEST} from './actions';

const INITIAL_UNINDEXED_STATE = {
  is_searching: false,
  error: null,
  page: 1,
  per_page: 100,
  response: {}
};

function unindexedReducer(state = INITIAL_UNINDEXED_STATE, action) {
  switch (action.type) {
    case START_UNINDEXED_RESOURCES_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: true, response: {}, error: null});

    case FINISH_UNINDEXED_RESOURCES_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: false, response: action.response, error: null});

    case ERROR_UNINDEXED_RESOURCES_REQUEST:
      return Object.assign({}, state, {page: action.page, is_searching: false, response: {}, error: action.error});

    default:
      return state;
  }
}

export {unindexedReducer};
