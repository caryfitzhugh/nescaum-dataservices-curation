const INITIAL_SEARCH_STATE = {
  records: [],
  facets: {},
};

function searchReducer(state = INITIAL_SEARCH_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export {searchReducer};
