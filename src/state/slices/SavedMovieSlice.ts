import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { DataProps } from "./PopularSlice";

interface IInitialState {
  list: DataProps[];
  count: number;
  savedList: ISavedList[];
}

interface ISavedList {
  id: string;
  title: string;
  movies: DataProps[];
  length: number;
}

const initialState: IInitialState = {
  list: [],
  count: 0,
  savedList: [],
};

export const createList = async (title: string, savedMovies: {}[]) => {
  const { data } = await axios.post(
    "https://acb-api.algoritmika.org/api/movies/list",
    {
      title: title,
      movies: savedMovies.map((movie) => movie),
    }
  );

  return data;
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
      state.savedList.push({ ...action.payload, length: state.list.length });
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
