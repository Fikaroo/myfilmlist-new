import { combineReducers } from "@reduxjs/toolkit";
import MoviesReducer from "./slices/MoviesSlice";
import PopularReducer from "./slices/PopularSlice";
import SavedMovieReducer from "./slices/SavedMovieSlice";
export const rootReducer = combineReducers({
  popularFilm: PopularReducer,
  movies: MoviesReducer,
  savedMovie: SavedMovieReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
