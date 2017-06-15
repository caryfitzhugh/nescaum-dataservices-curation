import immutable from "object-path-immutable";
import {FINISH_CREATE_RESOURCE} from '../create/actions';

const INITIAL_RESOURCES_STATE = {
};

function resourcesReducer(state = INITIAL_RESOURCES_STATE, action) {
  switch (action.type) {
    case FINISH_CREATE_RESOURCE:
      return immutable.set(state, [action.response.docid], action.response);

    default:
      return state;
  }
}

export { resourcesReducer};
