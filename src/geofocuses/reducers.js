import immutable from "object-path-immutable";
import { START_GEOFOCUS_DELETE, FINISH_GEOFOCUS_DELETE, ERROR_GEOFOCUS_DELETE,
  START_GEOFOCUS_UPDATE, FINISH_GEOFOCUS_UPDATE, ERROR_GEOFOCUS_UPDATE,
  START_GEOFOCUS_GET, FINISH_GEOFOCUS_GET, ERROR_GEOFOCUS_GET} from './actions';
import { FINISH_CREATE_GEOFOCUS } from './create/actions';

const INITIAL_GEOFOCUSES_STATE = {
  errors: {

  },
};

function geofocusesReducer(state = INITIAL_GEOFOCUSES_STATE, action) {
  switch (action.type) {
    case START_GEOFOCUS_UPDATE:
      return state;
    case FINISH_GEOFOCUS_UPDATE:
      var new_state = immutable.set(state, [action.geofocus.id], action.geofocus);
      return new_state;
    case ERROR_GEOFOCUS_UPDATE:
      var new_state = immutable.set(new_state, ["errors", action.geofocus.id], action.error);
      return new_state;

    case START_GEOFOCUS_DELETE:
      return state;
    case FINISH_GEOFOCUS_DELETE:
      var new_state = immutable.set(state, [action.id], null);
      return new_state;
    case ERROR_GEOFOCUS_DELETE:
      var new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case START_GEOFOCUS_GET:
      return state;
    case FINISH_GEOFOCUS_GET:
      var new_state = immutable.set(state, [action.id], action.response);
      return new_state;
    case ERROR_GEOFOCUS_GET:
      var new_state = immutable.set(state, [action.id], null);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case FINISH_CREATE_GEOFOCUS:
      var new_state = immutable.set(state, [action.response.id], action.response);
      new_state = immutable.set(new_state, ["errors", action.response.id], null);
      return new_state;

    default:
      return state;
  }
}

export { geofocusesReducer};
