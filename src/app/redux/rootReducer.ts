import { combineReducers } from "redux";
import movies from './reducers/movies/movies';
import search from './reducers/search/search';
import settings from './reducers/settings/settings';
import shows from './reducers/shows/shows';

const rootReducer = combineReducers({
  movies: movies,
  search: search,
  settings: settings,
  shows: shows
});

export default rootReducer;