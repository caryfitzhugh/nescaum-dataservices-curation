import fetch from 'isomorphic-fetch';

export const START_FACET_QUERY = 'start-facet-query';
export const FINISH_FACET_QUERY = 'finish-facet-query';
export const ERROR_FACET_QUERY = 'error-facet-query';

export const START_CREATE_RESOURCE = 'start-create-resource';
export const FINISH_CREATE_RESOURCE = 'finish-create-resource';
export const ERROR_CREATE_RESOURCE = 'error-create-resource';

/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchFacets(facets) {
  return fetch(process.env.REACT_APP_API_HOST + "/resources/facets?names=" + encodeURIComponent(facets.join(",")) );
}

/*
 *  Start a search request action
 */
function startFacetQuery(rid, facets) {
  return { type: START_FACET_QUERY,
           facets: facets,
           request_id: rid};
}

/*
 *  Finish a search request successfully.
 */
function finishFacetQuery(rid, response) {
  return { type: FINISH_FACET_QUERY,
            request_id: rid,
            response: response};
}

/*
 *  Finish a search request with an error.
 */
function errorFacetQuery(rid) {
  return { type: ERROR_FACET_QUERY,
            request_id: rid};
}

/*  This will perform a search - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function facetQuery(facets) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    var request_id = performance.now();
    dispatch(startFacetQuery(request_id, facets));

    return fetchFacets(facets).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error";
        }
      }).then(function(json) {
        dispatch(finishFacetQuery(request_id, json));
      })
      .catch((e) => {
        console.warn(e);
        dispatch(errorFacetQuery(request_id));
      });
  };
}

function sendCreateResource(resource) {
  return fetch(process.env.REACT_APP_API_HOST + "/resources",
            {
              method: "POST",
              body: JSON.stringify({resource: resource})
            });
}

function startCreateResource(resource) {
  return { type: START_CREATE_RESOURCE,
           resource: resource};
}

function finishCreateResource(response) {
  return { type: FINISH_CREATE_RESOURCE,
            response: response};
}

function errorCreateResource(response) {
  return { type: ERROR_CREATE_RESOURCE,
            response: response};
}

export function createResource(resource) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    var request_id = performance.now();
    dispatch(startCreateResource(resource));

    return sendCreateResource(resource).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCreateResource(json));
      })
      .catch((e) => {
        console.warn(e);
        dispatch(errorCreateResource(e));
      });
  };
}