import fetch from 'isomorphic-fetch';

export const START_RESOURCE_GET = 'start-resource-get';
export const FINISH_RESOURCE_GET = 'finish-resource-get';
export const ERROR_RESOURCE_GET = 'error-resource-get';

export const START_RESOURCE_DELETE = 'start-resource-delete';
export const FINISH_RESOURCE_DELETE = 'finish-resource-delete';
export const ERROR_RESOURCE_DELETE = 'error-resource-delete';

export const START_RESOURCE_INDEX = 'start-resource-index';
export const FINISH_RESOURCE_INDEX = 'finish-resource-index';
export const ERROR_RESOURCE_INDEX = 'error-resource-index';

/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchResource(docid) {
  return fetch("/resources/" + docid);
}

/*
 *  Start a resource request action
 */
function startResourceGet(docid) {
  return { type: START_RESOURCE_GET,
           docid: docid};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceGet(docid, response) {
  return { type: FINISH_RESOURCE_GET,
            docid: docid,
            response: response};
}

/*
 *  Finish a resource request with an error.
 */
function errorResourceGet(docid, error) {
  return { type: ERROR_RESOURCE_GET,
    docid: docid,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function getResource(docid) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceGet(docid));

    return fetchResource(docid).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceGet(docid, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceGet(docid, body))
        });
      });
  };
}

/*
 * returns a promise
 */
function fetchResourceIndex(docid, indexed) {
  return fetch("/resources/" + docid + "/index",
          {
            method: indexed ? "POST" : "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
}

/*
 *  Start a resource request action
 */
function startResourceIndex(docid, indexed) {
  return { type: START_RESOURCE_INDEX,
            indexed: indexed,
           docid: docid};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceIndex(docid, response) {
  return { type: FINISH_RESOURCE_INDEX,
            docid: docid,
            response: response};
}

/*
 *  Finish a resource request with an error.
 */
function errorResourceIndex(docid, error) {
  return { type: ERROR_RESOURCE_INDEX,
    docid: docid,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function indexResource(docid, indexed) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceIndex(docid, indexed));

    return fetchResourceIndex(docid, indexed).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceIndex(docid, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceIndex(docid, body))
        });
      });
  };
}

/*
 * Delete against the API
 *
 * returns a promise
 */
function deleteResourceDo(docid) {
  return fetch("/resources/" + docid,
          { method: "DELETE",
           'Accept': 'application/json'});
}

/*
 *  Start a resource request action
 */
function startResourceDelete(docid) {
  return { type: START_RESOURCE_DELETE,
           docid: docid};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourceDelete(docid, response) {
  return { type: FINISH_RESOURCE_DELETE,
            docid: docid,
            response: response};
}

/*
 *  Finish a resource request with an error.
 */
function errorResourceDelete(docid, error) {
  return { type: ERROR_RESOURCE_DELETE,
    docid: docid,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function deleteResource(docid) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourceDelete(docid));

    return deleteResourceDo(docid).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishResourceDelete(docid, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourceDelete(docid, body))
        });
      });
  };
}
