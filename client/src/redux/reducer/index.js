const initialState = {
  detail: [],
  characters: [],
  occupations: [],
  allCharacters: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: payload,
        allCharacters: payload,
      };
    case "FILTER_BY_STATUS":
      const allCharacters = state.allCharacters;
      const statusFiltered =
        payload === "All"
          ? allCharacters
          : allCharacters.filter((el) => el.status === payload);
      return {
        ...state,
        characters: statusFiltered,
      };
    case "FILTER_CREATED":
      // var allCharacters = state.allCharacters;
      const createdFilter =
        payload === "Created"
          ? state.allCharacters.filter((el) => el.createdInDb)
          : state.allCharacters.filter((el) => !el.createdInDb);
      return {
        ...state,
        characters: payload === "All" ? state.allCharacters : createdFilter,
      };
    case "GET_NAME_CHARACTER":
      return {
        ...state,
        characters: payload,
      };
    case "POST_CHARACTER":
      return {
        ...state,
      };
    case "GET_OCCUPATIONS":
      return {
        ...state,
        occupations: payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: payload,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        payload === "asc"
          ? state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        characters: sortedArr,
      };
    default:
      return state;
  }
}

export default rootReducer;
