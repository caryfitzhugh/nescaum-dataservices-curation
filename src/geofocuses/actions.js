import fetch from 'isomorphic-fetch';

export const START_GEOFOCUS_GET = 'start-geofocus-get';
export const FINISH_GEOFOCUS_GET = 'finish-geofocus-get';
export const ERROR_GEOFOCUS_GET = 'error-geofocus-get';

export const START_GEOFOCUS_DELETE = 'start-geofocus-delete';
export const FINISH_GEOFOCUS_DELETE = 'finish-geofocus-delete';
export const ERROR_GEOFOCUS_DELETE = 'error-geofocus-delete';

export const START_GEOFOCUS_UPDATE = 'start-geofocus-update';
export const FINISH_GEOFOCUS_UPDATE = 'finish-geofocus-update';
export const ERROR_GEOFOCUS_UPDATE = 'error-geofocus-update';

export const RESET_GEOFOCUS_ERRORS = 'reset-geofocus-errors';

export function resetGeofocusError(geofocus) {
  return {type: RESET_GEOFOCUS_ERRORS,
          geofocus: geofocus};
}
/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchGeofocus(id) {
  return fetch("/geofocuses/" + id);
}

/*
 *  Start a geofocus request action
 */
function startGeofocusGet(id) {
  return { type: START_GEOFOCUS_GET,
           id: id};
}

/*
 *  Finish a doc request successfully.
 */
function finishGeofocusGet(id, response) {
  return { type: FINISH_GEOFOCUS_GET,
            id: id,
            response: response};
}

/*
 *  Finish a geofocus request with an error.
 */
function errorGeofocusGet(id, error) {
  return { type: ERROR_GEOFOCUS_GET,
    id: id,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function getGeofocus(id) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startGeofocusGet(id));

    return fetchGeofocus(id).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishGeofocusGet(id, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorGeofocusGet(id, body))
        });
      });
  };
}

/*
 * Delete against the API
 *
 * returns a promise
 */
function deleteGeofocusDo(geofocus) {
  return fetch("/geofocuses/" + geofocus.id,
          { method: "DELETE",
           'Accept': 'application/json'});
}

/*
 *  Start a geofocus request action
 */
function startGeofocusDelete(geofocus) {
  return { type: START_GEOFOCUS_DELETE,
           geofocus: geofocus};
}

/*
 *  Finish a doc request successfully.
 */
function finishGeofocusDelete(geofocus, response) {
  return { type: FINISH_GEOFOCUS_DELETE,
            geofocus: geofocus,
            response: response};
}

/*
 *  Finish a geofocus request with an error.
 */
function errorGeofocusDelete(geofocus, error) {
  return { type: ERROR_GEOFOCUS_DELETE,
    geofocus: geofocus,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function deleteGeofocus(geofocus, history, destination) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startGeofocusDelete(geofocus));

    return deleteGeofocusDo(geofocus).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishGeofocusDelete(geofocus, json));
      })
      .then(function() {
        history.push(destination || "/geofocuses");
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorGeofocusDelete(geofocus, body))
        });
      });
  };
}

/*
 * Update against the API
 *
 * returns a promise
 */
function updateGeofocusDo(geofocus) {
  return fetch("/geofocuses/" + geofocus.id,
          { method: "PUT",
            body: JSON.stringify({geofocus: geofocus}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }});
}

/*
 *  Start a geofocus request action
 */
function startGeofocusUpdate(geofocus) {
  return { type: START_GEOFOCUS_UPDATE,
           geofocus: geofocus};
}

/*
 *  Finish a doc request successfully.
 */
function finishGeofocusUpdate(geofocus, response) {
  return { type: FINISH_GEOFOCUS_UPDATE,
            geofocus: geofocus};
}

/*
*  Finish a geofocus request with an error.
*/
function errorGeofocusUpdate(geofocus, error) {
  return {type: ERROR_GEOFOCUS_UPDATE,
    geofocus: geofocus,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function updateGeofocus(geofocus, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startGeofocusUpdate(geofocus));

    return updateGeofocusDo(geofocus).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishGeofocusUpdate(geofocus, json));
        return json;
      })
      .then(function() {
        history.push("/geofocuses/"+geofocus.id);
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorGeofocusUpdate(geofocus, body))
        });
      });
  };
}
