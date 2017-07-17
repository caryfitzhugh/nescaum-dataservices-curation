import immutable from "object-path-immutable";
import { START_COLLECTION_DELETE, FINISH_COLLECTION_DELETE, ERROR_COLLECTION_DELETE,
  START_COLLECTION_UPDATE, FINISH_COLLECTION_UPDATE, ERROR_COLLECTION_UPDATE,
  START_COLLECTION_GET, FINISH_COLLECTION_GET, ERROR_COLLECTION_GET} from './actions';
import { FINISH_CREATE_COLLECTION } from './create/actions';

const INITIAL_COLLECTIONES_STATE = {
  errors: {

  },
};

function collectionsReducer(state = INITIAL_COLLECTIONES_STATE, action) {
  let new_state;
  switch (action.type) {
    case START_COLLECTION_UPDATE:
      new_state = immutable.set(state, [action.collection.id, 'is_updating'], true);
      return new_state;
    case FINISH_COLLECTION_UPDATE:
      new_state = immutable.set(state, [action.collection.id], action.collection);
      return new_state;
    case ERROR_COLLECTION_UPDATE:
      new_state = immutable.set(state, [action.collection.id, 'is_updating'], false);
      new_state = immutable.set(new_state, ["errors", action.collection.id], action.error);
      return new_state;

    case START_COLLECTION_DELETE:
      new_state = immutable.set(state, [action.collection.id, 'is_deleting'], true);
      return new_state;
    case FINISH_COLLECTION_DELETE:
      new_state = immutable.set(state, [action.id], null);
      return new_state;
    case ERROR_COLLECTION_DELETE:
      new_state = immutable.set(state, [action.collection.id, 'is_deleting'], false);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case START_COLLECTION_GET:
      return state;
    case FINISH_COLLECTION_GET:
      new_state = immutable.set(state, [action.id], action.response);
      return new_state;
    case ERROR_COLLECTION_GET:
      new_state = immutable.set(state, [action.id], null);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case FINISH_CREATE_COLLECTION:
      new_state = immutable.set(state, [action.response.id], action.response);
      new_state = immutable.set(new_state, ["errors", action.response.id], null);
      return new_state;

    default:
      return state;
  }
}

export { collectionsReducer};
