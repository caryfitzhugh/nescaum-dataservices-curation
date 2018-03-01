import fetch from 'isomorphic-fetch';

export const START_SEARCH = 'start-search';
export const FINISH_SEARCH = 'finish-search';
export const ERROR_SEARCH = 'error-search';
export const TOGGLE_FACET_SEARCH = 'toggle-facet-search';

/*
  page
  integer
  per_page
  integer
  published_on_end
  published_on_start
  actions []
  authors []
  climate_changes []
  content_types []
  effects []
  formats []
  geofocus []
  keywords []
  publishers []
  sectors []
  strategies []
  states []
  query
*/

function dateToAPIDate(date) {
  return date.getFullYear() + "/" + (date.getMonth()+1) +
    date.getDate();
}
/*
 * Fetch against the API, the search parameters are serialized into the query param.
 *
 * returns a promise
 */
function fetchSearchResults(parameters) {
  var params = {
    page: parameters.page,
    per_page: parameters.per_page,
  };
  if (parameters.query) {
    params.query = parameters.query;
  }
  if (parameters.published_on_end) {
    params.published_on_end = dateToAPIDate(params.published_on_end);
  }
  if (parameters.published_on_start) {
    params.published_on_start = dateToAPIDate(params.published_on_start);
  }

  ['actions', 'authors', 'climate_changes', 'effects', 'formats', 'geofocus',
   'keywords', 'publishers', 'sectors', 'strategies', 'states',
   'content_types'].forEach((key) => {
      if (parameters.facets[key]) {
        params[key] = parameters.facets[key].join(",");
      }
    });

  var qparams = '?' + Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&')
  return fetch("/resources" + qparams, {
    credentials: 'same-origin'
  });
}

/*
 *  Start a search request action
 */
function startSearchRequest(rid, params) {
  return { type: START_SEARCH,
           request_id: rid,
           request: params };
}

/*
 *  Finish a search request successfully.
 */
function finishSearchRequest(rid, response) {
  return { type: FINISH_SEARCH,
            request_id: rid,
            response: response};
}

/*
 *  Finish a search request with an error.
 */
function errorSearchRequest(rid) {
  return { type: ERROR_SEARCH,
            request_id: rid};
}

export function toggleFacet(type, value, checked) {
  return { type: TOGGLE_FACET_SEARCH,
           toggle: { type: type, value: value, checked: checked}
         }
}

/*  This will perform a search - triggering the fetch, along with dispatching
*   the appropriate actions.
*   This should be dispatched, and uses redux-thunk to process
*/
export function performSearch({query, facets, page, per_page}) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    var request_id = performance.now();
    dispatch(startSearchRequest(request_id, {query,facets,page,per_page}));

    return fetchSearchResults({query, facets, page, per_page}).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error Performing Resoruces Search");
        }
      }).then(function(json) {
        json.resources.forEach((resource) => {
          if (resource.pubstart) {
            resource.pubstart = new Date(resource.pubstart);
          }
          if (resource.pubend) {
            resource.pubend = new Date(resource.pubend);
          }
        });
        json.total_pages = Math.ceil(json.total / json.per_page);
        dispatch(finishSearchRequest(request_id, json));
      })
      .catch((e) => {
        console.warn(e);
        dispatch(errorSearchRequest(request_id));
      });
  };
}
