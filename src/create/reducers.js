import immutable from "object-path-immutable";
import {START_CREATE_RESOURCE, FINISH_CREATE_RESOURCE, ERROR_CREATE_RESOURCE, START_FACET_QUERY, FINISH_FACET_QUERY, ERROR_FACET_QUERY} from './actions'

const INITIAL_CREATE_STATE = {
  facets: {}
};

function createReducer(state = INITIAL_CREATE_STATE, action) {
  switch (action.type) {
    case START_FACET_QUERY:
      var new_state = immutable.set(state, ["facets", "response"], {});
      new_state = immutable.set(new_state, ["facets", "request_id"], action.request_id);
      new_state = immutable.set(new_state, ["facets", "existing"], {});

      return new_state;
    case FINISH_FACET_QUERY:
      var facets = action.response.reduce((memo, facet_data) => {
        memo[facet_data.name] = facet_data.facets.map((fct) => {return fct.value});
        return memo;
      }, {});

      return immutable.set(state, ["facets", "available"], facets);

    case ERROR_FACET_QUERY:
      var new_state = immutable.set(state, ["facets", "request_id"], null);
      return new_state;

    case START_CREATE_RESOURCE:
      var new_state = immutable.set(state, ["create", "response"], {});
      new_state = immutable.set(new_state, ["create", "error"], null);
      new_state = immutable.set(new_state, ["facets", "parameters"], action.resource);
      return new_state;

    case FINISH_CREATE_RESOURCE:
      var new_state = immutable.set(state, ["create", "response"], action.response);
      return new_state;

    case ERROR_CREATE_RESOURCE:
      var new_state = immutable.set(state, ["create", "error"], action.response);
      return new_state;

    default:
      return state;
  }
}

export { createReducer};
