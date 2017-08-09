import fetch from 'isomorphic-fetch';

export const START_RESOURCE_GET = 'start-resource-get';
export const FINISH_RESOURCE_GET = 'finish-resource-get';
export const ERROR_RESOURCE_GET = 'error-resource-get';

export const START_RESOURCE_DELETE = 'start-resource-delete';
export const FINISH_RESOURCE_DELETE = 'finish-resource-delete';
export const ERROR_RESOURCE_DELETE = 'error-resource-delete';

export const START_RESOURCE_UPDATE = 'start-resource-update';
export const FINISH_RESOURCE_UPDATE = 'finish-resource-update';
export const ERROR_RESOURCE_UPDATE = 'error-resource-update';

export const START_RESOURCE_INDEX = 'start-resource-index';
export const FINISH_RESOURCE_INDEX = 'finish-resource-index';
export const ERROR_RESOURCE_INDEX = 'error-resource-index';

export const RESET_RESOURCE_ERRORS = 'reset-geofocus-errors';

export function resetResourceError(resource) {
  return {type: RESET_RESOURCE_ERRORS,
          resource: resource};
}
/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchResource(id) {
  return fetch("/resources/" + id, {
            credentials: 'same-origin',
          });
}

/*
 *  Start a resource request action
 */
function startResourceGet(id) {
  return { type: START_RESOURCE_GET,
           id: id};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceGet(id, response) {
  return { type: FINISH_RESOURCE_GET,
            id: id,
            response: response};
}

/*
 *  Finish a resource request with an error.
 */
function errorResourceGet(id, error) {
  return { type: ERROR_RESOURCE_GET,
    id: id,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function getResource(id) {
  console.log("Get Resuorce: " + id);
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceGet(id));

    return fetchResource(id).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceGet(id, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceGet(id, body))
        });
      });
  };
}

/*
 * returns a promise
 */
function fetchResourceIndex(id, indexed) {
  return fetch("/resources/" + id + "/index",
          {
            method: indexed ? "POST" : "DELETE",
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
}

/*
 *  Start a resource request action
 */
function startResourceIndex(id, indexed) {
  return { type: START_RESOURCE_INDEX,
            indexed: indexed,
           id: id};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceIndex(id, response) {
  return { type: FINISH_RESOURCE_INDEX,
            id: id,
            response: response};
}

/*
 *  Finish a resource request with an error.
 */
function errorResourceIndex(id, error) {
  return { type: ERROR_RESOURCE_INDEX,
    id: id,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function indexResource(id, indexed) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceIndex(id, indexed));

    return fetchResourceIndex(id, indexed).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceIndex(id, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceIndex(id, body))
        });
      });
  };
}

/*
 * Delete against the API
 *
 * returns a promise
 */
function deleteResourceDo(id) {
  return fetch("/resources/" + id,
          { method: "DELETE",
            credentials: 'same-origin',
           'Accept': 'application/json'});
}

/*
 *  Start a resource request action
 */
function startResourceDelete(id) {
  return { type: START_RESOURCE_DELETE,
           id: id};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceDelete(id, response) {
  return { type: FINISH_RESOURCE_DELETE,
            id: id,
            response: response};
}

/*
 *  Finish a resource request with an error.
 */
function errorResourceDelete(id, error) {
  return { type: ERROR_RESOURCE_DELETE,
    id: id,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function deleteResource(id, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceDelete(id));

    return deleteResourceDo(id).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceDelete(id, json));
        return json;
      })
      .then(function(json) {
        if (history) {
          history.goBack();
        }
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceDelete(id, body))
        });
      });
  };
}
/*
 * Update against the API
 *
 * returns a promise
 */
function updateResourceDo(resource) {
  return fetch("/resources/" + resource.id,
          { method: "PUT",
            body: JSON.stringify({resource: resource}),
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }});
}

/*
 *  Start a resource request action
 */
function startResourceUpdate(resource) {
  return { type: START_RESOURCE_UPDATE,
           resource: resource};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceUpdate(resource, response) {
  return { type: FINISH_RESOURCE_UPDATE,
            resource: resource};
}

/*
*  Finish a resource request with an error.
*/
function errorResourceUpdate(resource, error) {
  return {type: ERROR_RESOURCE_UPDATE,
    resource: resource,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function updateResource(resource, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceUpdate(resource));

    return updateResourceDo(resource).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceUpdate(resource, json));
        return json;
      })
      .then(function() {
        history.push("/resources/"+resource.id);
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceUpdate(resource, body))
        });
      });
  };
}
