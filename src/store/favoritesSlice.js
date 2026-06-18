/*
  --- SLICE ---
  A slice is a piece of the Redux store that owns its own state, actions, and reducers.
  createSlice() generates action creators and action types automatically.

  --- ACTIONS ---
  Actions describe what happened (e.g., "a restaurant was added to favorites").
  Redux Toolkit auto-generates action creators from the reducer functions below.

  --- REDUCERS ---
  Reducers specify how the state changes in response to an action.
  Redux Toolkit uses Immer internally, so we can write "mutating" code
  that safely produces immutable updates under the hood.
*/

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    // Adds a restaurant to favorites (if not already there)
    addFavorite: (state, action) => {
      const exists = state.favorites.find((r) => r.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    // Removes a restaurant from favorites by id
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (r) => r.id !== action.payload.id
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
