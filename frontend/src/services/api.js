const API_BASE_URL = 'http://127.0.0.1:8000';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Authentication API calls
export const authAPI = {
  // User signup
  userSignup: async (userData) => {
    return apiCall('/auth/user/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // User login
  userLogin: async (credentials) => {
    return apiCall('/auth/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Authority login
  authorityLogin: async (credentials) => {
    return apiCall('/auth/authority/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get user profile
  getProfile: async (token) => {
    return apiCall(`/auth/profile?token=${token}`, {
      method: 'GET',
    });
  },

  // Logout
  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

// Store tokens in localStorage
export const tokenStorage = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

// Store user data
export const userStorage = {
  setUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  clearUser: () => {
    localStorage.removeItem('user');
  },
}; 