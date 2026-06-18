/*
  --- SLICE: foodDiarySlice ---
  Manages the Food Diary state in Redux.

  --- Redux Actions ---
  Actions are dispatched to tell the store "something happened."
  addMeal: adds a new meal entry and updates totalCalories.
  removeMeal: removes a meal by id and subtracts its calories from the total.

  --- Reducers ---
  Reducers handle the state transitions. Redux Toolkit uses Immer,
  so we can write direct mutations that are safely converted to
  immutable updates behind the scenes.
*/

import { createSlice } from "@reduxjs/toolkit";

const foodDiarySlice = createSlice({
  name: "foodDiary",
  initialState: {
    entries: [],
    totalCalories: 0,
  },
  reducers: {
    addMeal: (state, action) => {
      state.entries.push(action.payload);
      state.totalCalories += action.payload.calories;
    },
    removeMeal: (state, action) => {
      const meal = state.entries.find((e) => e.id === action.payload.id);
      if (meal) {
        state.totalCalories -= meal.calories;
        state.entries = state.entries.filter((e) => e.id !== action.payload.id);
      }
    },
  },
});

export const { addMeal, removeMeal } = foodDiarySlice.actions;
export default foodDiarySlice.reducer;
