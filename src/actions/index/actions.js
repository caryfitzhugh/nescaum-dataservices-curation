import fetch from 'isomorphic-fetch';

export const START_INDEX_ACTIONS_REQUEST = 'start-index-actions-request';
export const FINISH_INDEX_ACTIONS_REQUEST = 'finish-index-actions-request';
export const ERROR_INDEX_ACTIONS_REQUEST = 'error-index-actions-request';

/*
 * returns a promise
 */
function fetchActionsIndex(user_id, startdate, enddate, page, per_page) {
  var esc = encodeURIComponent;
  let params = {page, per_page};
  if (user_id) {
    params.user_id = user_id;
  }

  if (startdate) {
    params.start = startdate;
  }

  if (enddate) {
    params.end = enddate;
  }

  var query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

  return fetch("/actions/?" + query,
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
function startActionsIndex(opts) {
  return { type: START_INDEX_ACTIONS_REQUEST,
    user_id: opts.user_id,
    startdate: opts.startdate,
    enddate: opts.enddate,
    page: opts.page,
    per_page: opts.per_page };
}

/*
 *  Finish a doc request successfully.
 */
function finishActionsIndex(opts, response) {
  return { type: FINISH_INDEX_ACTIONS_REQUEST,
    user_id: opts.user_id,
    startdate: opts.startdate,
    enddate: opts.enddate,
    page: opts.page,
    response: response,
    per_page: opts.per_page };
}

/*
 *  Finish a resource request with an error.
 */
function errorActionsIndex(opts, error) {
  return { type: ERROR_INDEX_ACTIONS_REQUEST,
    user_id: opts.user_id,
    startdate: opts.startdate,
    enddate: opts.enddate,
    page: opts.page,
    per_page: opts.per_page,
    error: error};
}

/*  This will perform a get - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function performIndexSearch(opts) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startActionsIndex(opts));

    return fetchActionsIndex(opts.user_id, opts.startdate, opts.enddate, opts.page, opts.per_page).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        json.total_pages = Math.ceil(json.total / json.per_page);
        dispatch(finishActionsIndex(opts, json));
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
          dispatch(errorActionsIndex(opts, body))
        });
      });
  };
}
