import fetch from 'isomorphic-fetch';

export const RESET_CREATE_GEOFOCUS = 'reset-create-geofocus';
export const START_CREATE_GEOFOCUS = 'start-create-geofocus';
export const FINISH_CREATE_GEOFOCUS = 'finish-create-geofocus';
export const ERROR_CREATE_GEOFOCUS = 'error-create-geofocus';

function sendCreateGeofocus(geofocus) {
  return fetch("/geofocuses",
            {
              method: "POST",
              body: JSON.stringify({geofocus: geofocus}),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });
}

export function resetCreateGeofocus() {
  return { type: RESET_CREATE_GEOFOCUS };
}

function startCreateGeofocus(geofocus) {
  return { type: START_CREATE_GEOFOCUS,
           geofocus: geofocus};
}

function finishCreateGeofocus(response) {
  return { type: FINISH_CREATE_GEOFOCUS,
            response: response};
}

function errorCreateGeofocus(response) {
  return { type: ERROR_CREATE_GEOFOCUS,
            response: response};
}

export function createGeofocus(geofocus, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCreateGeofocus(geofocus));

    return sendCreateGeofocus(geofocus).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCreateGeofocus(json));
        return json;
      })
      .then(function(json) {
        if (history) {
          history.push("/geofocuses/"+json.id);
        }
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCreateGeofocus(body))
        });
      });
  };
}
