import { createApp } from 'vue'
import App from './App.vue'
import './axios'
import store from './store/Store'

import 'typeface-poppins';

import 'vue3-toastify/dist/index.css';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// import router
import router from './router'

// public instance
const app =createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

