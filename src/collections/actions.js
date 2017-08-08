import fetch from 'isomorphic-fetch';

export const START_COLLECTION_GET = 'start-collection-get';
export const FINISH_COLLECTION_GET = 'finish-collection-get';
export const ERROR_COLLECTION_GET = 'error-collection-get';

export const START_COLLECTION_DELETE = 'start-collection-delete';
export const FINISH_COLLECTION_DELETE = 'finish-collection-delete';
export const ERROR_COLLECTION_DELETE = 'error-collection-delete';

export const START_COLLECTION_UPDATE = 'start-collection-update';
export const FINISH_COLLECTION_UPDATE = 'finish-collection-update';
export const ERROR_COLLECTION_UPDATE = 'error-collection-update';

export const RESET_COLLECTION_ERRORS = 'reset-collection-errors';

export function resetCollectionError(collection) {
  return {type: RESET_COLLECTION_ERRORS,
          collection: collection};
}
/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchCollection(id) {
  return fetch("/collections/" + id, {
        credentials: 'same-origin'
  });
}

/*
 *  Start a collection request action
 */
function startCollectionGet(id) {
  return { type: START_COLLECTION_GET,
           id: id};
}

/*
 *  Finish a doc request successfully.
 */
function finishCollectionGet(id, response) {
  return { type: FINISH_COLLECTION_GET,
            id: id,
            response: response};
}

/*
 *  Finish a collection request with an error.
 */
function errorCollectionGet(id, error) {
  return { type: ERROR_COLLECTION_GET,
    id: id,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function getCollection(id) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCollectionGet(id));

    return fetchCollection(id).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCollectionGet(id, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCollectionGet(id, body))
        });
      });
  };
}

/*
 * Delete against the API
 *
 * returns a promise
 */
function deleteCollectionDo(collection) {
  return fetch("/collections/" + collection.id,
          { method: "DELETE",
            credentials: 'same-origin',
           'Accept': 'application/json'});
}

/*
 *  Start a collection request action
 */
function startCollectionDelete(collection) {
  return { type: START_COLLECTION_DELETE,
    collection: collection};
}

/*
 *  Finish a doc request successfully.
 */
function finishCollectionDelete(collection, response) {
  return { type: FINISH_COLLECTION_DELETE,
            collection: collection,
            response: response};
}

/*
 *  Finish a collection request with an error.
 */
function errorCollectionDelete(collection, error) {
  return { type: ERROR_COLLECTION_DELETE,
    collection: collection,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function deleteCollection(collection, history, destination) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCollectionDelete(collection));

    return deleteCollectionDo(collection).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCollectionDelete(collection, json));
      })
      .then(function() {
        history.push(destination || "/collections");
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCollectionDelete(collection, body))
        });
      });
  };
}

/*
 * Update against the API
 *
 * returns a promise
 */
function updateCollectionDo(collection) {
  return fetch("/collections/" + collection.id,
          { method: "PUT",
            body: JSON.stringify({collection: collection}),
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }});
}

/*
 *  Start a collection request action
 */
function startCollectionUpdate(collection) {
  return { type: START_COLLECTION_UPDATE,
           collection: collection};
}

/*
 *  Finish a doc request successfully.
 */
function finishCollectionUpdate(collection, response) {
  return { type: FINISH_COLLECTION_UPDATE,
            collection: collection};
}

/*
*  Finish a collection request with an error.
*/
function errorCollectionUpdate(collection, error) {
  return {type: ERROR_COLLECTION_UPDATE,
    collection: collection,
    error: error};
}

/*  This will perform a delete - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function updateCollection(collection, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCollectionUpdate(collection));

    return updateCollectionDo(collection).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCollectionUpdate(collection, json));
        return json;
      })
      .then(function() {
        history.push("/collections/"+collection.id);
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCollectionUpdate(collection, body))
        });
      });
  };
}
