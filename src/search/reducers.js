import {START_SEARCH, FINISH_SEARCH, ERROR_SEARCH, CLEAR_SEARCH } from './actions';

const INITIAL_SEARCH_STATE = {
  isSearching: false,
  isError: false,
  request_id: null,
  parameters: {
    query: "",
    facets: {},
    page: 1,
    per_page: 50,
  },
  response: {},
};

function searchReducer(state = INITIAL_SEARCH_STATE, action) {
  switch (action.type) {
    case START_SEARCH:
      return Object.assign({}, state,
                            {isSearching: true,
                             parameters:  action.parameters,
                             request_id:  action.request_id,
                             response:    {}});

    case ERROR_SEARCH:
      if (state.request_id === action.request_id) {
        return Object.assign({}, state, {isSearching: false, isError: true, response: {}});
      } else {
        return state;
      }

    case FINISH_SEARCH:
      if (state.request_id === action.request_id) {
        return Object.assign({}, state, {isSearching: false, response: action.response});
      } else {
        return state;
      }

    case CLEAR_SEARCH:
      return Object.assign({}, INITIAL_SEARCH_STATE);

    default:
      return state;
  }
}

export {searchReducer};
