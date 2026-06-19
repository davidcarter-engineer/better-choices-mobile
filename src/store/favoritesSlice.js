/*
  --- SLICE: favoritesSlice ---
  Manages favorites state matching the web application.
  Prevents duplicates by name and removes by name.
*/

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    // Add to favorites (prevent duplicates by name)
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        (item) => item.name === action.payload.name
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    // Remove from favorites by name
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
