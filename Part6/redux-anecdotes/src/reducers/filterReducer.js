const initialState = null;

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

// Action Creator
export const setFilter = (query) => {
  return {
    type: "SET_FILTER",
    payload: query,
  };
};

export default filterReducer;
