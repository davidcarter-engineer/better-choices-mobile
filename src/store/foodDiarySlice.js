/*
  --- SLICE: foodDiarySlice ---
  Manages Food Diary state with persistent storage.

  --- AsyncStorage ---
  AsyncStorage is React Native's key-value storage system (like localStorage
  on the web). It persists data on the device between app sessions.
  Data is stored as strings, so we JSON.stringify objects before saving
  and JSON.parse them when loading.

  --- Data Persistence ---
  Every time entries change (add/remove), we save the full entries array
  to AsyncStorage. When the app starts, we load saved entries using
  the loadMeals action to restore previous data.

  --- Redux Integration ---
  The slice manages entries in Redux for real-time UI updates.
  AsyncStorage is called as a side effect inside the reducers via
  a helper function. We also use createAsyncThunk-style loading
  via a loadMeals reducer that accepts pre-loaded data from the component.

  --- Calendar Logic ---
  Each entry includes a `date` field (YYYY-MM-DD string).
  This allows filtering entries by date for the calendar view
  and calculating daily totals for any selected date.
*/

import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "better_choices_food_diary";

// Helper: save entries to AsyncStorage
const saveToStorage = async (entries) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.warn("Failed to save to AsyncStorage:", error);
  }
};

const foodDiarySlice = createSlice({
  name: "foodDiary",
  initialState: {
    entries: [],
  },
  reducers: {
    // Load meals from AsyncStorage (called on app start)
    loadMeals: (state, action) => {
      state.entries = action.payload;
    },
    // Add a meal entry with date, then persist
    addMeal: (state, action) => {
      state.entries.push(action.payload);
      saveToStorage(state.entries);
    },
    // Remove a meal by id, then persist
    removeMeal: (state, action) => {
      state.entries = state.entries.filter((e) => e.id !== action.payload.id);
      saveToStorage(state.entries);
    },
  },
});

export const { loadMeals, addMeal, removeMeal } = foodDiarySlice.actions;
export default foodDiarySlice.reducer;

// Helper: load entries from AsyncStorage (called from component)
export const loadMealsFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn("Failed to load from AsyncStorage:", error);
    return [];
  }
};
