/*
  --- SLICE: favoritesSlice ---
  Manages favorites backed by the Better Choices API (MongoDB).

  --- User Ownership ---
  Each favorite is linked to the authenticated user via JWT.
  The server only returns/modifies favorites belonging to that user.

  --- Protected Resources ---
  All endpoints require a valid JWT in the Authorization header.
  Without it, the server returns 401 Unauthorized.

  --- User-Specific Queries ---
  GET /api/favorites returns only the logged-in user's favorites.
  This means favorites sync across web and mobile for the same account.
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/api";

async function getToken() {
  return await AsyncStorage.getItem("token");
}

// GET /api/favorites — fetch all favorites for the authenticated user
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    const token = await getToken();
    if (!token) return [];

    console.log("[Favorites] GET /api/favorites");
    try {
      const res = await fetch(`${API_BASE_URL}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("[Favorites] GET response:", res.status);
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      console.log("[Favorites] GET error:", err.message);
      return rejectWithValue("Failed to fetch favorites");
    }
  }
);

// POST /api/favorites — save a new favorite
export const addFavoriteAPI = createAsyncThunk(
  "favorites/addFavoriteAPI",
  async (favoriteData, { rejectWithValue }) => {
    const token = await getToken();
    if (!token) return rejectWithValue("Not authenticated");

    console.log("[Favorites] POST /api/favorites", favoriteData);
    try {
      const res = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favoriteData),
      });
      const data = await res.json();
      console.log("[Favorites] POST response:", res.status);
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err) {
      console.log("[Favorites] POST error:", err.message);
      return rejectWithValue("Failed to save favorite");
    }
  }
);

// DELETE /api/favorites/:id — remove a favorite
export const removeFavoriteAPI = createAsyncThunk(
  "favorites/removeFavoriteAPI",
  async (id, { rejectWithValue }) => {
    const token = await getToken();
    if (!token) return rejectWithValue("Not authenticated");

    console.log("[Favorites] DELETE /api/favorites/" + id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/favorites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("[Favorites] DELETE response:", res.status);
      if (!res.ok) return rejectWithValue(data.message);
      return id;
    } catch (err) {
      console.log("[Favorites] DELETE error:", err.message);
      return rejectWithValue("Failed to remove favorite");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    loading: false,
  },
  reducers: {
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addFavoriteAPI.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFavoriteAPI.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
