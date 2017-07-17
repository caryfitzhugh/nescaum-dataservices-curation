import immutable from "object-path-immutable";
import {RESET_CREATE_RESOURCE, START_CREATE_RESOURCE, FINISH_CREATE_RESOURCE, ERROR_CREATE_RESOURCE, START_FACET_QUERY, FINISH_FACET_QUERY, ERROR_FACET_QUERY} from './actions'

const INITIAL_CREATE_STATE = {
  facets: {}
};

function createReducer(state = INITIAL_CREATE_STATE, action) {
  let new_state;
  switch (action.type) {
    case START_FACET_QUERY:
      new_state = immutable.set(state, ["facets", "available"], {});
      return new_state;
    case FINISH_FACET_QUERY:
      let facets = action.response.reduce((memo, facet_data) => {
        memo[facet_data.name] = facet_data.facets.map((fct) => {return fct.name});
        return memo;
      }, {});
      return immutable.set(state, ["facets", "available"], facets);

    case ERROR_FACET_QUERY:
      new_state = immutable.set(state, ["facets", "request_id"], null);
      return new_state;

    case RESET_CREATE_RESOURCE:
      new_state = immutable.set(state, ["response"], {});
      new_state = immutable.set(new_state, ["error"], null);
      new_state = immutable.set(new_state, ["is_creating"], false);
      new_state = immutable.set(new_state, ["facets", "parameters"], null);
      new_state = immutable.set(new_state, ["facets", "response"], null);
      new_state = immutable.set(new_state, ["created_docid"], null);
      return new_state;

    case START_CREATE_RESOURCE:
      new_state = immutable.set(state, ["response"], {});
      new_state = immutable.set(new_state, ["error"], null);
      new_state = immutable.set(new_state, ["is_creating"], true);
      new_state = immutable.set(new_state, ["facets", "parameters"], action.resource);
      return new_state;

    case FINISH_CREATE_RESOURCE:
      new_state = immutable.set(state, ["response"], action.response);
      new_state = immutable.set(new_state, ["is_creating"], false);
      new_state = immutable.set(new_state, ["resources", action.response.docid], action.response);
      new_state = immutable.set(new_state, ["created_docid"], action.response.docid);
      return new_state;

    case ERROR_CREATE_RESOURCE:
      new_state = immutable.set(state, ["error"], action.response);
      new_state = immutable.set(new_state, ["is_creating"], false);
      return new_state;

    default:
      return state;
  }
}

export { createReducer};
