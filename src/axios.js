import axios from "axios";
import { toast } from "vue3-toastify";
import store from './store/Store';
import Swal from 'sweetalert2';

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://swrbackend.azurewebsites.net/";
const fallbackBaseURL = "https://swrbackend.azurewebsites.net/";

// Request interceptor to add the Authorization header with JWT token from cookies
axios.interceptors.request.use(
  async (config) => {
    const token = getCookie('token'); // Replace with your function to get the token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    store.commit('setLoading', true);
    return config;
  },
  (error) => {
    store.commit('setLoading', false);
    return Promise.reject(error);
  }
);

// Function to handle errors with SweetAlert
const handleSwalError = (error) => {
  let message = 'An error occurred while processing your request.';
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401:
        message = 'Unauthorized';
        break;
      case 404:
        message = 'Not found';
        break;
      default:
        message = error.response.data.error || message;
        break;
    }
  } else if (error.request) {
    message = 'No response received';
  } else {
    message = error.response.data.error || message;
  }
  console.error('This is the request error:', message);
};

// Axios response interceptor for handling token refresh, error handling, and fallback logic
axios.interceptors.response.use(
  (response) => {
    console.log(response.request.responseURL);
    console.log("This is axios message:", response.data.message, ":", response);

    if (response.data.message !== undefined) {
      toast(response.data.message, {
        "type": response.data.success ? "success" : "error"
      });
    }
    store.commit('setLoading', false);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const token = getCookie('token');
    const refreshToken = getCookie('refreshToken');

    if ((error.response.data.error === 'You are not authorized, must be admin' || error.response.data.error === 'You are not authorized, must be company') && error.response.status === 401) {
      window.location.href = "/not_authorized";
    }

    if (error.response.data.error === "TokenExpiredError" && !refreshToken) {
      sessionExpired();
    }

    if (error.response.statusText === 'Unauthorized' && error.response.status === 401) {
      if (!token && !refreshToken) {
        sessionExpired();
      }
      if (error.response.data.error === 'TokenExpiredError' && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.post('/refreshtoken', { refreshToken });
          setCookie('token', response.data.token);
          setCookie('refreshToken', response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          handleSwalError(refreshError);
        }
      } else {
        sessionExpired();
        handleSwalError(error);
      }
    } else if (!originalRequest._retry && error.request && !error.response) {
      // Fallback logic for base URL
      originalRequest._retry = true;
      originalRequest.baseURL = fallbackBaseURL;
      return axios(originalRequest);
    } else {
      console.error('Request error:', error);
      handleSwalError(error);
    }
    store.commit('setLoading', false);
    return Promise.reject(error);
  }
);

function sessionExpired() {
  store.commit("removeUserData");
  Swal.fire({
    title: "Your session has expired",
    text: "Please Login again",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Login"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  });
}

// Helper functions to get and set cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
}

export default axios;
