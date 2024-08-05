import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({
  isCompression: false,
  encryptionSecret: '12345678901234567890123456789012'
});
 //const baseUrl = 'http://localhost:8000/';
 const baseUrl = process.env.VUE_APP_API_URL;

const store = createStore({
  state: {
    loading: false,
    userData: {},
    profileData: {},
    location: {},
    userRole: '',
    profileImage: '',
    isLogedIn: false,
    imageUrl: `${baseUrl}image/`,
    categories: {},
    jobs: {},
    defaultImage: `${baseUrl}image/default.png`,
    socialMediaLinks: {}
  },

  mutations: {
    setUser(state, userData) {
      state.userData = userData;
      state.isLogedIn = true;
      state.userRole = userData.role;
      state.profileImage = state.imageUrl + userData.profileImage;
      state.socialMediaLinks = userData.socialMediaLinks;
      state.location = userData.location;
    },
    setProfile(state, profileData) {
      state.profileData = profileData;
    },
    setProfileImage(state, profileImage) {
      state.profileImage = profileImage;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    removeUserData(state) {
      state.userData = {};
      state.profileData = {};
      state.userRole = '';
      state.profileImage = '';
      state.isLogedIn = false;
      state.location = {};
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
  },

  plugins: [createPersistedState({
    key: 'swrData',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
  })],
});

export default store;
