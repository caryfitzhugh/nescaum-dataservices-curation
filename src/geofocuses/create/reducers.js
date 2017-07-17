import immutable from "object-path-immutable";
import {RESET_CREATE_GEOFOCUS, START_CREATE_GEOFOCUS, FINISH_CREATE_GEOFOCUS, ERROR_CREATE_GEOFOCUS} from './actions'

const INITIAL_CREATE_STATE = {
  facets: {}
};

function geofocusesCreateReducer(state = INITIAL_CREATE_STATE, action) {
  let new_state;
  switch (action.type) {

    case RESET_CREATE_GEOFOCUS:
      new_state = immutable.set(state, ["response"], {});
      new_state = immutable.set(new_state, ["error"], null);
      new_state = immutable.set(new_state, ["is_creating"], false);
      new_state = immutable.set(new_state, ["facets", "parameters"], null);
      new_state = immutable.set(new_state, ["facets", "response"], null);
      return new_state;

    case START_CREATE_GEOFOCUS:
      new_state = immutable.set(state, ["response"], {});
      new_state = immutable.set(new_state, ["error"], null);
      new_state = immutable.set(new_state, ["is_creating"], true);
      new_state = immutable.set(new_state, ["facets", "parameters"], action.geofocus);
      return new_state;

    case FINISH_CREATE_GEOFOCUS:
      new_state = immutable.set(state, ["response"], action.response);
      new_state = immutable.set(new_state, ["is_creating"], false);
      new_state = immutable.set(new_state, ["geofocuses", action.response.id], action.response);
      return new_state;

    case ERROR_CREATE_GEOFOCUS:
      new_state = immutable.set(state, ["error"], action.response);
      new_state = immutable.set(new_state, ["is_creating"], false);
      return new_state;

    default:
      return state;
  }
}

export { geofocusesCreateReducer};
