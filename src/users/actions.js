import fetch from 'isomorphic-fetch';

export const START_USER_GET = 'start-user-get';
export const FINISH_USER_GET = 'finish-user-get';
export const ERROR_USER_GET = 'error-user-get';

export const START_USER_DELETE = 'start-user-delete';
export const FINISH_USER_DELETE = 'finish-user-delete';
export const ERROR_USER_DELETE = 'error-user-delete';

export const START_USER_UPDATE = 'start-user-update';
export const FINISH_USER_UPDATE = 'finish-user-update';
export const ERROR_USER_UPDATE = 'error-user-update';

export const RESET_USER_ERRORS = 'reset-user-errors';

export function resetUserError(user) {
  return {type: RESET_USER_ERRORS,
          user: user};
}
/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchUser(id) {
  return fetch("/users/" + id);
}

/*
 *  Start a user request action
 */
function startUserGet(id) {
  return { type: START_USER_GET,
           id: id};
}

/*
 *  Finish a doc request successfully.
 */
function finishUserGet(id, response) {
  return { type: FINISH_USER_GET,
            id: id,
            response: response};
}

/*
 *  Finish a user request with an error.
 */
function errorUserGet(id, error) {
  return { type: ERROR_USER_GET,
    id: id,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function getUser(id) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startUserGet(id));

    return fetchUser(id).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishUserGet(id, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorUserGet(id, body))
        });
      });
  };
}

/*
 * Delete against the API
 *
 * returns a promise
 */
function deleteUserDo(user) {
  return fetch("/users/" + user.id,
          { method: "DELETE",
           'Accept': 'application/json'});
}

/*
 *  Start a user request action
 */
function startUserDelete(user) {
  return { type: START_USER_DELETE,
           user: user};
}

/*
 *  Finish a doc request successfully.
 */
function finishUserDelete(user, response) {
  return { type: FINISH_USER_DELETE,
            user: user,
            response: response};
}

/*
 *  Finish a user request with an error.
 */
function errorUserDelete(user, error) {
  return { type: ERROR_USER_DELETE,
    user: user,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function deleteUser(user, history, destination) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startUserDelete(user));

    return deleteUserDo(user).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishUserDelete(user, json));
      })
      .then(function() {
        history.push(destination || "/users");
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorUserDelete(user, body))
        });
      });
  };
}

/*
 * Update against the API
 *
 * returns a promise
 */
function updateUserDo(user) {
  return fetch("/users/" + user.id,
          { method: "PUT",
            body: JSON.stringify({user: user}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }});
}

/*
 *  Start a user request action
 */
function startUserUpdate(user) {
  return { type: START_USER_UPDATE,
           user: user};
}

/*
 *  Finish a doc request successfully.
 */
function finishUserUpdate(user, response) {
  return { type: FINISH_USER_UPDATE,
            user: user};
}

/*
*  Finish a user request with an error.
*/
function errorUserUpdate(user, error) {
  return {type: ERROR_USER_UPDATE,
    user: user,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function updateUser(user, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startUserUpdate(user));

    return updateUserDo(user).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishUserUpdate(user, json));
        return json;
      })
      .then(function() {
        history.push("/users/"+user.id);
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorUserUpdate(user, body))
        });
      });
  };
}
