/*
  --- API Configuration ---
  Central configuration for all API requests in the mobile app.

  --- Problem ---
  The Android emulator runs inside its own virtual machine and cannot
  access the host machine via "localhost." The emulator maps the host's
  localhost to the special IP address 10.0.2.2. iOS simulators run
  directly on the Mac, so localhost works normally.

  --- Solution ---
  We use Platform.OS to detect the running platform at runtime:
    - "android" → use 10.0.2.2 (maps to host machine's localhost)
    - "ios" (or anything else) → use localhost directly

  --- Usage ---
  Import API_BASE_URL in any file that makes API requests:
    import { API_BASE_URL } from "../config/api";
    fetch(`${API_BASE_URL}/auth/login`, { ... })
*/

import { Platform } from "react-native";

// Port where the Better Choices API server is running
const API_PORT = 5001;

// Android emulator uses 10.0.2.2 to reach host machine's localhost
// iOS simulator and physical devices on same network use localhost
const BASE_URL =
  Platform.OS === "android"
    ? `http://10.0.2.2:${API_PORT}`
    : `http://localhost:${API_PORT}`;

export const API_BASE_URL = BASE_URL;

// Helper: make an API request with console logging
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Log the outgoing request
  console.log(`[API Request] ${options.method || "GET"} ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    // Log the response status
    console.log(`[API Response] ${response.status} ${url}`);

    return response;
  } catch (error) {
    console.log(`[API Error] ${url} — ${error.message}`);
    throw error;
  }
};
