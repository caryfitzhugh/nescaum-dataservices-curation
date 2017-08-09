import immutable from "object-path-immutable";
import {FINISH_CREATE_RESOURCE} from './create/actions';
import { START_RESOURCE_INDEX, FINISH_RESOURCE_INDEX, ERROR_RESOURCE_INDEX,
  RESET_RESOURCE_ERRORS,
  START_RESOURCE_UPDATE, FINISH_RESOURCE_UPDATE, ERROR_RESOURCE_UPDATE,
  START_RESOURCE_GET, FINISH_RESOURCE_GET, ERROR_RESOURCE_GET} from './actions';

const INITIAL_RESOURCES_STATE = {
  errors: {

  },
};

function resourcesReducer(state = INITIAL_RESOURCES_STATE, action) {
  let new_state;
  console.log(action);
  switch (action.type) {
    case START_RESOURCE_INDEX:
      new_state = immutable.set(state, [action.id, 'indexed'], action.indexed);
      return new_state;

    case FINISH_RESOURCE_INDEX:
      new_state = immutable.set(state, [action.id], action.response);
      return new_state;

    case ERROR_RESOURCE_INDEX:
      new_state = immutable.set(state, [action.id], null);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case START_RESOURCE_UPDATE:
      new_state = immutable.set(state, [action.resource.id, 'is_updating'], true);
      return new_state;
    case FINISH_RESOURCE_UPDATE:
      new_state = immutable.set(state, [action.resource.id], action.resource);
      return new_state;
    case ERROR_RESOURCE_UPDATE:
      new_state = immutable.set(state, [action.resource.id, 'is_updating'], false);
      new_state = immutable.set(new_state, ["errors", action.resource.id], action.error);
      return new_state;

    case START_RESOURCE_GET:
      return state;
    case FINISH_RESOURCE_GET:
      new_state = immutable.set(state, [action.id], action.response);
      return new_state;

    case ERROR_RESOURCE_GET:
      new_state = immutable.set(state, [action.id], null);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case FINISH_CREATE_RESOURCE:
      return immutable.set(state, [action.response.id], action.response);

    case RESET_RESOURCE_ERRORS:
      return immutable.set(state, ['errors', action.resource.id], null);

    default:
      return state;
  }
}

export { resourcesReducer};
