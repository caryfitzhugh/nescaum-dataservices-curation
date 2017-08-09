import fetch from 'isomorphic-fetch';

export const START_UNINDEXED_RESOURCES_REQUEST = 'start-unindexed-resources-request';
export const FINISH_UNINDEXED_RESOURCES_REQUEST = 'finish-unindexed-resources-request';
export const ERROR_UNINDEXED_RESOURCES_REQUEST = 'error-unindexed-resources-request';

/*
 * returns a promise
 */
function fetchResourcesUnindexed(page, per_page) {

  return fetch("/resources/unindexed?page="+page+"&per_page="+ per_page,
          {
            credentials: 'same-origin',
            method: "GET",
            headers: {
              'Accept': 'application/json'
            }
          });
}

/*
 *  Start a resource request action
 */
function startResourcesUnindexed(page, per_page) {
  return { type: START_UNINDEXED_RESOURCES_REQUEST,
            page: page,
            per_page: per_page};
}

/*
 *  Finish a doc request successfully.
 */
function finishResourcesUnindexed(page, per_page, response) {
  return { type: FINISH_UNINDEXED_RESOURCES_REQUEST,
            page: page,
            response: response,
            per_page: per_page };
}

/*
 *  Finish a resource request with an error.
 */
function errorResourcesUnindexed(page, per_page, error) {
  return { type: ERROR_UNINDEXED_RESOURCES_REQUEST,
    page: page,
    per_page: per_page,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function performUnindexedSearch(opts) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startResourcesUnindexed(opts.page, opts.per_page));

    return fetchResourcesUnindexed(opts.page, opts.per_page).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        json.total_pages = Math.ceil(json.total / json.per_page);
        dispatch(finishResourcesUnindexed(opts.page, opts.per_page, json));
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.error(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorResourcesUnindexed(opts.page, opts.per_page, body))
        });
      });
  };
}
