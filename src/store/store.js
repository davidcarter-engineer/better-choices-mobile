/*
  --- Redux Store ---
  The store is the single source of truth for the app's state.
  Matches the web application's store structure:
    - state.favorites (API-backed, MongoDB)
    - state.foodDiary (AsyncStorage, user-specific)
*/

import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import foodDiaryReducer from "./foodDiarySlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    foodDiary: foodDiaryReducer,
  },
});

export default store;
