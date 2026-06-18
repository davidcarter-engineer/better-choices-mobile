/*
  --- REDUX STORE ---
  The store is the single source of truth for the entire app's state.
  configureStore() from Redux Toolkit sets up the store with good defaults
  (including Redux DevTools and thunk middleware).

  We combine all slices (pieces of state) here. Currently we have one slice:
  favoritesReducer, which manages the favorites array.
*/

import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
