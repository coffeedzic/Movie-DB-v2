export const setQuery = (query: string) => ({
  type: 'SEARCH.SET_QUERY',
  payload: query
});

export const setTyping = (bool: boolean) => ({
  type: 'SEARCH.SET_TYPING',
  payload: bool
});

const initialState = {
  query: '',
  typing: false
};

const searchReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case 'SEARCH.SET_QUERY':
      return {
        ...state,
        query: action.payload
      };
    case 'SEARCH.SET_TYPING':
      return {
        ...state,
        typing: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;