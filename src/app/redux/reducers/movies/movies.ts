export const setTopMovies = (movies: any) => ({
  type: 'MOVIES.SET_TOP_MOVIES', 
  payload: movies
});

export const setSearchMovies = (movies: any) => ({
  type: 'MOVIES.SET_SEARCH_MOVIES', 
  payload: movies
});

const initialState = {
  topMovies: [],
  searchMovies: []
};

const moviesReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case 'MOVIES.SET_TOP_MOVIES':
      return {
        ...state,
        topMovies: action.payload
      };
    case 'MOVIES.SET_SEARCH_MOVIES':
      return {
        ...state,
        searchMovies: action.payload
      };
    default:
      return state;
  }
};

export default moviesReducer;