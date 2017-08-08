import fetch from 'isomorphic-fetch';

export const START_INDEX_COLLECTIONS_REQUEST = 'start-index-collections-request';
export const FINISH_INDEX_COLLECTIONS_REQUEST = 'finish-index-collections-request';
export const ERROR_INDEX_COLLECTIONS_REQUEST = 'error-index-collections-request';

/*
 * returns a promise
 */
function fetchCollectionsIndex(page, per_page) {

  return fetch("/collections/?page="+page+"&per_page="+ per_page,
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
function startCollectionsIndex(page, per_page) {
  return { type: START_INDEX_COLLECTIONS_REQUEST,
            page: page,
            per_page: per_page};
}

/*
 *  Finish a doc request successfully.
 */
function finishCollectionsIndex(page, per_page, response) {
  return { type: FINISH_INDEX_COLLECTIONS_REQUEST,
            page: page,
            response: response,
            per_page: per_page };
}

/*
 *  Finish a resource request with an error.
 */
function errorCollectionsIndex(page, per_page, error) {
  return { type: ERROR_INDEX_COLLECTIONS_REQUEST,
    page: page,
    per_page: per_page,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function performIndexSearch(opts) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCollectionsIndex(opts.page, opts.per_page));

    return fetchCollectionsIndex(opts.page, opts.per_page).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        json.total_pages = Math.ceil(json.total / json.per_page);
        dispatch(finishCollectionsIndex(opts.page, opts.per_page, json));
        if (opts.callback) {
          opts.callback(json);
        }
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.error(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCollectionsIndex(opts.page, opts.per_page, body))
        });
      });
  };
}

export function performCompleteIndexSearch(page) {
  page = page || 1;
  return function (dispatch) {
    dispatch(performIndexSearch({page: page, per_page: 100, callback: (json) => {
      if (json.total_pages > json.page) {
        dispatch(performCompleteIndexSearch(json.page + 1));
      }
    }}));
  }
}
