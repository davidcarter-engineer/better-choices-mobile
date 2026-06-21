/*
  --- AuthContext ---
  Provides authentication state to the mobile app using React Context.

  --- JWT Authentication ---
  After login/register, the server returns a JWT token.
  We store it in AsyncStorage (React Native's localStorage equivalent)
  and include it in the Authorization header on protected requests.

  --- Token Storage ---
  AsyncStorage persists the token across app restarts.
  On app load, we check for an existing token and restore the session.

  --- Login Flow ---
  1. User submits email + password
  2. POST /api/auth/login sends credentials to the backend
  3. Server returns { token, user }
  4. We store token in AsyncStorage and set user state

  --- Registration Flow ---
  1. User submits username, email, password, firstName, lastName, phone
  2. POST /api/auth/register sends data to the backend
  3. Server creates account and returns { token, user }
  4. We store token and set user state (auto-login)
*/

import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL, apiRequest } from "../config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  async function loadToken() {
    try {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await fetchProfile(savedToken);
      }
    } catch {}
    setLoading(false);
  }

  async function fetchProfile(authToken) {
    try {
      const res = await apiRequest("/api/profile", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        await logout();
      }
    } catch {
      await logout();
    }
  }

  async function login(email, password) {
    let res;
    try {
      res = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error("Cannot connect to server.");
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    await AsyncStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function register(username, email, password, firstName, lastName, phone) {
    let res;
    try {
      res = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, firstName, lastName, phone }),
      });
    } catch {
      throw new Error("Cannot connect to server.");
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    await AsyncStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function updateProfile(profileData) {
    let res;
    try {
      res = await apiRequest("/api/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileData),
      });
    } catch {
      throw new Error("Cannot connect to server.");
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");
    setUser(data.user);
  }

  async function changePassword(currentPassword, newPassword) {
    let res;
    try {
      res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch {
      throw new Error("Cannot connect to server.");
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password change failed");
    return data.message;
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
