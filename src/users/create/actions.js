import fetch from 'isomorphic-fetch';

export const RESET_CREATE_USER = 'reset-create-user';
export const START_CREATE_USER = 'start-create-user';
export const FINISH_CREATE_USER = 'finish-create-user';
export const ERROR_CREATE_USER = 'error-create-user';

function sendCreateUser(user) {
  return fetch("/users",
            {
              credentials: 'same-origin',
              method: "POST",
              body: JSON.stringify({user: user}),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });
}

export function resetCreateUser() {
  return { type: RESET_CREATE_USER };
}

function startCreateUser(user) {
  return { type: START_CREATE_USER,
           user: user};
}

function finishCreateUser(response) {
  return { type: FINISH_CREATE_USER,
            response: response};
}

function errorCreateUser(response) {
  return { type: ERROR_CREATE_USER,
            response: response};
}

export function createUser(user, history) {
  return function (dispatch) {
    // Dispatch that we are starting a search request
    dispatch(startCreateUser(user));

    return sendCreateUser(user).then(
      function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(json) {
        dispatch(finishCreateUser(json));
        return json;
      })
      .then(function(json) {
        console.log(json);
        history.push("/users/"+json.id);
      })
      .catch((e) => {
        var decoder = new TextDecoder();
        var body = '';
        console.warn(e);
        e.body.getReader().read().then((res) => {
          body += decoder.decode(res.value || new Uint8Array(), { stream: !res.done });
          dispatch(errorCreateUser(body))
        });
      });
  };
}
