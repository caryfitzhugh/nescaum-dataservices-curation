import fetch from 'isomorphic-fetch';

export const START_INDEX_GEOFOCUSES_REQUEST = 'start-index-geofocuses-request';
export const FINISH_INDEX_GEOFOCUSES_REQUEST = 'finish-index-geofocuses-request';
export const ERROR_INDEX_GEOFOCUSES_REQUEST = 'error-index-geofocuses-request';

/*
 * returns a promise
 */
function fetchGeofocusesIndex(page, per_page) {

  return fetch("/geofocuses/?page="+page+"&per_page="+ per_page,
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
function startGeofocusesIndex(page, per_page) {
  return { type: START_INDEX_GEOFOCUSES_REQUEST,
            page: page,
            per_page: per_page};
}

/*
 *  Finish a doc request successfully.
 */
function finishGeofocusesIndex(page, per_page, response) {
  return { type: FINISH_INDEX_GEOFOCUSES_REQUEST,
            page: page,
            response: response,
            per_page: per_page };
}

/*
 *  Finish a resource request with an error.
 */
function errorGeofocusesIndex(page, per_page, error) {
  return { type: ERROR_INDEX_GEOFOCUSES_REQUEST,
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
    dispatch(startGeofocusesIndex(opts.page, opts.per_page));

    return fetchGeofocusesIndex(opts.page, opts.per_page).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        json.total_pages = Math.ceil(json.total / json.per_page);
        dispatch(finishGeofocusesIndex(opts.page, opts.per_page, json));
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
          dispatch(errorGeofocusesIndex(opts.page, opts.per_page, body))
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
