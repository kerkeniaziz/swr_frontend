<template>
  <div class="bg-light">
    <SpinnerPage
      v-if="$route.path !== '/findjob'"
      :loading="$store.state.loading"
    />
    <div
      v-if="$store.state.isLogedIn"
      class="d-flex"
    >
      <div class="main">
        <navBarUser class="sticky" />
        <div class="d-flex">
          <div class="flex-shrink-0 p-3 bg-light">
            <sidebarAll class="sticky" />
          </div>
          <div class="flex-grow-1 container ps-0">
            <breadCrumbsPage
              v-if="!($store.state.userRole !=='candidate' && $store.state.userData._id === $route.params.id)"
              class="ms-4 border-light mt-4 mb-3"
            />
            <router-view class="ms-4" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <navBarHome />
      <router-view />
      <a
        href="#"
        class="btn btn-lg btn-primary btn-lg-square back-to-top"
      ><i class="bi bi-arrow-up" /></a>
      <FooterAll />
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterAll from './components/footerAll.vue'
import navBarHome from './components/navBarHome.vue';
import navBarUser from './components/navBarUser.vue';
import sidebarAll from './components/sideBar/sidebarAll.vue';
import breadCrumbsPage from './components/breadCrumbsPage.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SpinnerPage from './components/spinnerPage.vue';

export default {
  name: 'App',
  components: {
    sidebarAll,
    FooterAll,
    navBarUser,
    navBarHome,
    breadCrumbsPage,
    SpinnerPage

  },

  setup() {
    const route = useRoute();
    const formattedPath = computed(() => {
      return route.path.replace(/^\//, '').replace(/\//g, ' / ');
      
    });
    return {
      formattedPath,
    };
  },
  
}
</script>

<style>
:root{
  --icon-color: #007bff;
  --icon-color-hover: #0056b3;
  --sidebar-bg-color: #ffffff;
  --sidebar-item-hover: #959595 ;
  --sidebar-item-active: #cbcbcb ;
  --sidebar-color: #0b3968;
}
.z-index-1{
  z-index: 10 !important;
}
.back-to-top {
    position: fixed;
    right: 20px;
    bottom: 45px;
    z-index: 99;
}

.switchButton{
width: 50px;
}
.redStar{
  color: red;
}

.Toastify__toast-container{
  margin-top: 60px !important;
}

/* Modal Style */
form .inputField > div{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

form .inputField > div label{
    font-size: 20px;
    font-weight: 500;
}

#userForm form .inputField > div label::after{
    content: "*";
    color: red;
}

form .inputField > div input{
    width: 75%;
    padding: 10px;
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 2px solid #6c757d;
}

.add{
    width: 200px !important;
}
.modal-header{
    background: #6c757d;
    color: #fff;
}
.modal-footer .submit{
    font-size: 18px;
}
.modal-body form {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
}
.modal-body form .inputField{
    flex-basis: 68%;
    padding-left: 20px;
}

.modal-body form .imgholder{
    width: 200px;
    height: 200px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
}

/* .form-check-input:checked {
  background-color: #28a745;
  border-color: #28a745;
} */
.form-check-input {
margin-right: 15px;
  width: 2.5em !important;
  height: 1.5em;
  border-radius: 1em;
  cursor: pointer;
}
.form-check-input:focus {
  box-shadow: none;
}
.form-check-input:checked::before {
  transform: translateX(1.15rem);
}

.pointerIcon{
    cursor: pointer;
  }
  .deleteIcon{
      color: red;
      cursor: pointer;
  }
thead{
  border-radius: 8px;
  overflow: hidden;
}

  .table {
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  border-radius: 8px;
  overflow: hidden; 
  
}
.table th,
.table td {
  text-align: center;
  border: none;
  font-weight: 500;
  vertical-align: middle;
}
thead tr th{
  background-color:#adb5bd !important ;
  border: none;
  font-weight: 700 !important;
}

.w-200{
  width: 200px;}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  z-index: 1;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.main
{
  width: 100%;
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}

  .totalUsers{
  margin-right: 10px;
  margin-bottom: 5px;
  text-align: end;
font-weight: 700;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: white;
  border: none;
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.pagination button:hover {
      background-color: rgba(var(--bs-emphasis-color-rgb), 0.075);
   
}

.pagination span {
  font-size: 16px;
  margin: 0 10px;
}

.job-item:hover{
  background-color:white !important;
  box-shadow: 0 0 5px rgba(133, 133, 133, 0.255) !important;
}
.job-item{
  background-color:white !important;
}

</style>
