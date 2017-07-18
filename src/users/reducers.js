import immutable from "object-path-immutable";
import { START_USER_DELETE, FINISH_USER_DELETE, ERROR_USER_DELETE,
  START_USER_UPDATE, FINISH_USER_UPDATE, ERROR_USER_UPDATE,
  RESET_USER_ERRORS,
  START_USER_GET, FINISH_USER_GET, ERROR_USER_GET} from './actions';
import {  FINISH_INDEX_USERS_REQUEST} from './index/actions';

import { FINISH_CREATE_USER } from './create/actions';

const INITIAL_USERS_STATE = {
  errors: {

  },
};

function usersReducer(state = INITIAL_USERS_STATE, action) {
  let new_state;
  switch (action.type) {
    case RESET_USER_ERRORS:
      return immutable.set(state, ['errors', action.user.id], null);

    case START_USER_UPDATE:
      new_state = immutable.set(state, [action.user.id, 'is_updating'], true);
      return new_state;
    case FINISH_USER_UPDATE:
      new_state = immutable.set(state, [action.user.id], action.user);
      return new_state;
    case ERROR_USER_UPDATE:
      new_state = immutable.set(state, [action.user.id, 'is_updating'], false);
      new_state = immutable.set(new_state, ["errors", action.user.id], action.error);
      return new_state;

    case START_USER_DELETE:
      new_state = immutable.set(state, [action.user.id, 'is_deleting'], true);
      return new_state;
    case FINISH_USER_DELETE:
      new_state = immutable.set(state, [action.id], null);
      return new_state;
    case ERROR_USER_DELETE:
      new_state = immutable.set(state, [action.user.id, 'is_deleting'], false);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case START_USER_GET:
      return state;
    case FINISH_USER_GET:
      new_state = immutable.set(state, [action.id], action.response);
      return new_state;
    case ERROR_USER_GET:
      new_state = immutable.set(state, [action.id], null);
      new_state = immutable.set(new_state, ["errors", action.id], action.error);
      return new_state;

    case FINISH_CREATE_USER:
      new_state = immutable.set(state, [action.response.id], action.response);
      new_state = immutable.set(new_state, ["errors", action.response.id], null);
      return new_state;

    case FINISH_INDEX_USERS_REQUEST:
      let new_users = {};
      action.response.users.forEach((user) => {
        new_users[user.id] = user;
      });
      return Object.assign({}, state, new_users);

    default:
      return state;
  }
}

export { usersReducer};
