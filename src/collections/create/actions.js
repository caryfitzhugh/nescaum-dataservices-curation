import fetch from 'isomorphic-fetch';

export const RESET_CREATE_COLLECTION = 'reset-create-collection';
export const START_CREATE_COLLECTION = 'start-create-collection';
export const FINISH_CREATE_COLLECTION = 'finish-create-collection';
export const ERROR_CREATE_COLLECTION = 'error-create-collection';

function sendCreateCollection(collection) {
  return fetch("/collections",
    {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify({collection: collection}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
}

export function resetCreateCollection() {
  return { type: RESET_CREATE_COLLECTION };
}
function startCreateCollection(collection) {
  return { type: START_CREATE_COLLECTION,
           collection: collection};
}

function finishCreateCollection(response) {
  return { type: FINISH_CREATE_COLLECTION,
            response: response};
}

function errorCreateCollection(response) {
  return { type: ERROR_CREATE_COLLECTION,
            response: response};
}

export function createCollection(collection, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCreateCollection(collection));

    return sendCreateCollection(collection).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCreateCollection(json));
        return json;
      })
      .then(function(json) {
        history.push("/collections/"+json.id);
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCreateCollection(body))
        });
      });
  };
}
