import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../constants";
import { IInitialState } from "./PopularSlice";

export const getMoviesSearch = createAsyncThunk(
  "movies/getMoviesSearch",
  async (search: string) => {
    const { data } = await axios.get(
      `${BASE_URL}search/movie?query=${search}&api_key=${API_KEY}`
    );
    return data.results;
  }
);

interface IInit extends IInitialState {
  response: boolean;
}

const initialState: IInit = {
  data: [],
  loading: false,
  error: undefined,
  response: false,
};

const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMoviesSearch.pending, (state) => {
      state.response = true;
      state.loading = true;
    });
    builder.addCase(getMoviesSearch.fulfilled, (state, action) => {
      state.loading = false;

      state.data = action.payload;
    });
    builder.addCase(getMoviesSearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default MoviesSlice.reducer;
