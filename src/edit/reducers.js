
import immutable from "object-path-immutable";
//import {} from './actions';

const INITIAL_EDIT_STATE = {
  request: {},
  response: {},
  local: {},
  facets: {},
};

function editReducer(state = INITIAL_EDIT_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export {editReducer};
