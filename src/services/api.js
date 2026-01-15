const API_BASE_URL = "http://localhost:8080/api";

const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("API error: " + error);
    throw error;
  }
};

//API methods for listings
export const listingsAPI = {
  //get all listings
  getAll: () => apiFetch("/listings"),
  //create listing (needs the token)
  create: (data, token) =>
    apiFetch("/listings", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
  delete: (id, token) =>
    apiFetch(`/listings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

//API methods for authentification
export const authAPI = {
  login: (credentials) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  register: (userData) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
};
