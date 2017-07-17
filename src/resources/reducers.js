import immutable from "object-path-immutable";
import {FINISH_CREATE_RESOURCE} from './create/actions';
import { START_RESOURCE_INDEX, FINISH_RESOURCE_INDEX, ERROR_RESOURCE_INDEX,
  START_RESOURCE_GET, FINISH_RESOURCE_GET, ERROR_RESOURCE_GET} from './actions';

const INITIAL_RESOURCES_STATE = {
  errors: {

  },
};

function resourcesReducer(state = INITIAL_RESOURCES_STATE, action) {
  let new_state;
  switch (action.type) {
    case START_RESOURCE_INDEX:
      new_state = immutable.set(state, [action.docid, 'indexed'], action.indexed);
      return new_state;

    case FINISH_RESOURCE_INDEX:
      new_state = immutable.set(state, [action.docid], action.response);
      return new_state;

    case ERROR_RESOURCE_INDEX:
      new_state = immutable.set(state, [action.docid], null);
      new_state = immutable.set(new_state, ["errors", action.docid], action.error);
      return new_state;

    case START_RESOURCE_GET:
      return state;
    case FINISH_RESOURCE_GET:
      new_state = immutable.set(state, [action.docid], action.response);
      return new_state;

    case ERROR_RESOURCE_GET:
      new_state = immutable.set(state, [action.docid], null);
      new_state = immutable.set(new_state, ["errors", action.docid], action.error);
      return new_state;

    case FINISH_CREATE_RESOURCE:
      return immutable.set(state, [action.response.docid], action.response);

    default:
      return state;
  }
}

export { resourcesReducer};
