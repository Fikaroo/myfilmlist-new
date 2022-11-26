import { createSlice, nanoid } from "@reduxjs/toolkit";
import { DataProps } from "./PopularSlice";

interface IInitialState {
  list: DataProps[];
  count: number;
  savedList: ISavedList[];
}

interface ISavedList {
  id: string;
  nameList: string;
  movies: DataProps[];
  length: number;
}

const initialState: IInitialState = {
  list: [],
  count: 0,
  savedList: [],
};

const SavedMovieSlice = createSlice({
  name: "savedMovie",
  initialState,
  reducers: {
    saveMovie: (state, action) => {
      state.list.push(action.payload);
      state.count++;
    },
    unSaveMovie: (state, action) => {
      state.list = state.list.filter((movie) => action.payload !== movie.id);
      state.count--;
    },
    addList: (state, action) => {
      const id = nanoid();
      state.savedList.push({
        id: id,
        nameList: action.payload,
        movies: state.list,
        length: state.count,
      });
    },
    deleteList: (state, action) => {
      state.savedList = state.savedList.filter(
        (list) => list.id !== action.payload
      );
    },
  },
});

export default SavedMovieSlice.reducer;
export const { saveMovie, unSaveMovie, addList, deleteList } =
  SavedMovieSlice.actions;
