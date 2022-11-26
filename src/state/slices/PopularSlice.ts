import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, API_KEY } from "../constants";
import axios from "axios";

const filmName = "Avengers";

export const getPopularData = createAsyncThunk(
  "film/fetchPopularFilm",
  async () => {
    const { data } = await axios.get(
      `${BASE_URL}search/movie?query=${filmName}&api_key=${API_KEY}`
    );
    return data.results;
  }
);

export interface IInitialState {
  data: DataProps[];
  loading: boolean;
  error: any;
}

export type DataProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const initialState: IInitialState = {
  data: [],
  error: null,
  loading: false,
};

const PopularSlice = createSlice({
  name: "popularFilm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPopularData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.splice(0, 5);
    });
    builder.addCase(getPopularData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default PopularSlice.reducer;
