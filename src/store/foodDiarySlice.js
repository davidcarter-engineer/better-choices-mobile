/*
  --- SLICE: foodDiarySlice ---
  Manages Food Diary state backed by the Better Choices API (MongoDB).
  Entries sync across web and mobile for the same user account.

  --- API Endpoints ---
  GET    /api/diary       — fetch all entries for the user
  GET    /api/diary/:date — fetch entries for a specific date
  POST   /api/diary       — add a new entry
  DELETE /api/diary/:id   — remove an entry
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

async function getToken() {
  return await AsyncStorage.getItem("token");
}

// Fetch all diary entries for the authenticated user
export const fetchDiaryEntries = createAsyncThunk(
  "foodDiary/fetchEntries",
  async (_, { rejectWithValue }) => {
    const token = await getToken();
    if (!token) return [];

    console.log("[Diary] GET /api/diary");
    try {
      const res = await fetch(`${API_BASE_URL}/api/diary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("[Diary] GET response:", res.status);
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      console.log("[Diary] GET error:", err.message);
      return rejectWithValue("Failed to fetch diary");
    }
  }
);

// Add a new diary entry
export const addMealAPI = createAsyncThunk(
  "foodDiary/addMeal",
  async (mealData, { rejectWithValue }) => {
    const token = await getToken();
    if (!token) return rejectWithValue("Not authenticated");

    console.log("[Diary] POST /api/diary", mealData);
    try {
      const res = await fetch(`${API_BASE_URL}/api/diary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mealData),
      });
      const data = await res.json();
      console.log("[Diary] POST response:", res.status);
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      console.log("[Diary] POST error:", err.message);
      return rejectWithValue("Failed to save meal");
    }
  }
);

// Remove a diary entry
export const removeMealAPI = createAsyncThunk(
  "foodDiary/removeMeal",
  async (id, { rejectWithValue }) => {
    const token = await getToken();
    if (!token) return rejectWithValue("Not authenticated");

    console.log("[Diary] DELETE /api/diary/" + id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/diary/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("[Diary] DELETE response:", res.status);
      if (!res.ok) return rejectWithValue(data.message);
      return id;
    } catch (err) {
      console.log("[Diary] DELETE error:", err.message);
      return rejectWithValue("Failed to remove meal");
    }
  }
);

const today = new Date().toISOString().split("T")[0];

const foodDiarySlice = createSlice({
  name: "foodDiary",
  initialState: {
    entries: [], // flat array of all entries from API
    selectedDate: today,
    loading: false,
  },
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    clearDiary(state) {
      state.entries = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaryEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiaryEntries.fulfilled, (state, action) => {
        state.entries = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiaryEntries.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addMealAPI.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })
      .addCase(removeMealAPI.fulfilled, (state, action) => {
        state.entries = state.entries.filter((e) => e._id !== action.payload);
      });
  },
});

export const { setSelectedDate, clearDiary } = foodDiarySlice.actions;
export default foodDiarySlice.reducer;
