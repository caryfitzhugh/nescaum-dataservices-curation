import immutable from "object-path-immutable";
import {TOGGLE_FACET_SEARCH, START_SEARCH, FINISH_SEARCH, ERROR_SEARCH} from './actions';

const INITIAL_SEARCH_STATE = {
  is_searching: false,
  is_error: false,
  request_id: null,
  parameters: {
    per_page: 50,
    facets: {},
    page: 0,
    query: null,
  },
  request: {
    query: "",
    facets: {},
    page: 1,
    per_page: 50,
  },
  response: {},
};

function searchReducer(state = INITIAL_SEARCH_STATE, action) {
  switch (action.type) {
    case TOGGLE_FACET_SEARCH:
      var current = new Set(state.parameters.facets[action.toggle.type]);

      if (action.toggle.checked) {
        current.add(action.toggle.value);
      } else {
        current.delete(action.toggle.value);
      }
      return immutable.set(state, ['parameters','facets',action.toggle.type], Array.from(current));
    case START_SEARCH:
      return Object.assign({}, state,
                            {is_searching: true,
                             parameters: action.request,
                             request:  action.request,
                             request_id:  action.request_id,
                             response:    {}});

    case ERROR_SEARCH:
      if (state.request_id === action.request_id) {
        return Object.assign({}, state, {is_searching: false, is_error: true, response: {}});
      } else {
        return state;
      }

    case FINISH_SEARCH:
      if (state.request_id === action.request_id) {
        return Object.assign({}, state, {is_searching: false, response: action.response});
      } else {
        return state;
      }

    default:
      return state;
  }
}

export {searchReducer};
