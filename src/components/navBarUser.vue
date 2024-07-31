<template>
  <!-- Header -->

  <nav class="navbar navbar-expand col bg-white shadow-sm end-0 z-index-1">
    <ul class="navbar-nav align-items-center justify-content-start col-12 d.xs ">
      <li class="nav-item col-md-2 d-md-flex justify-content-center ">  
        <router-link
          to="/"
          class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5 col-12"
        >
          <img
            src="../assets/img/2.png"
            alt="SWR Logo"
            height="44"
            class="me-5 "
          >
        </router-link>
      </li>
      <!-- search-->
      <li class="nav-item  col-md-8  d-none d-md-flex justify-content-center me-5 ">     
        <div class="row g-1 px-3 py-2  col-9">
          <div class="col-8">
            <label
              class="visually-hidden"
              for="inputSearchNavbar"
            >Search</label>
            <input
              id="inputSearchNavbar"
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search for a Job..."
              autocomplete="off"
            >
          </div>
          <div class="col-4">
            <button
              type="submit"
              class="btn btn-primary"
              @click="Search()"
            >
              Search
            </button>
          </div>
        </div>
      </li>
      <!-- language-->
      <li class="nav-item  ">
        <a
          class="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="position-relative pt-1">
            <i class="bi bi-globe" />
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-md-end bsb-dropdown-sm bsb-dropdown-animation bsb-fadeIn">
          <div>
            <h6 class="dropdown-header fs-7 text-center">
              Multilingual
            </h6>
          </div>
          <div>
            <hr class="dropdown-divider mb-0">
          </div>
          <div class="list-group list-group-flush">
            <a
              href="#"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              <div class="row g-0 align-items-center">
                    
                <div class="col-12">
                  <div class="ps-3">
                    <div class="fs-7">Arabic</div>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              <div class="row g-0 align-items-center">
                    
                <div class="col-12">
                  <div class="ps-3">
                    <div class="fs-7">French</div>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action active"
              aria-current="true"
            >
              <div class="row g-0 align-items-center">
                    
                <div class="col-12">
                  <div class="ps-3">
                    <div class="fs-7">English</div>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div>
            <hr class="dropdown-divider mt-0">
          </div>
        </div>
      </li>
      <!-- notification-->
      <li class="nav-item  ">
        <a
          class="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="position-relative pt-1">
            <i class="bi bi-bell" />
            <span class="p-1 bg-danger border border-light rounded-circle position-absolute top-0 start-100 translate-middle">
              <span class="visually-hidden">New Notifications</span>
            </span>
          </span>
        </a>
        <ul class="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn">
          <li>
            <h6 class="dropdown-header fs-7 text-center">
              18 Notifications
            </h6>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <a
              class="dropdown-item d-flex align-items-center"
              href="#!"
            >
              <span>
                <i class="bi bi-envelope-fill me-2" />
                <span class="fs-7">New Messages</span>
              </span>
              <span class="fs-7 ms-auto text-secondary">5 mins</span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <a
              class="dropdown-item d-flex align-items-center"
              href="#!"
            >
              <span>
                <i class="bi bi-person-fill me-2" />
                <span class="fs-7">Friend Requests</span>
              </span>
              <span class="fs-7 ms-auto text-secondary">17 hours</span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <a
              class="dropdown-item d-flex align-items-center"
              href="#!"
            >
              <span>
                <i class="bi bi-file-earmark-fill me-2" />
                <span class="fs-7">New Reports</span>
              </span>
              <span class="fs-7 ms-auto text-secondary">3 days</span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <a
              class="dropdown-item fs-7 text-center"
              href="#"
            >See All Notifications</a>
          </li>
        </ul>
      </li>
      <!-- account-->
      <li class="nav-item me-5 ">
        <a
          class="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="$store.state.profileImage"
            width="35"
            height="35"
            class="img-fluid rounded-circle"
            alt="Luke Reeves"
          >
        </a>
        <ul class="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn me-5 ">
          <li>
            <router-link
              to="profile"
              class="dropdown-item"
              aria-current="true"
            >
              <div class="row g-0 align-items-center">
                <div class="col-3">
                  <img
                    :src="$store.state.profileImage"
                    width="55"
                    height="55"
                    class="img-fluid rounded-circle"
                    alt="Luke Reeves"
                  >
                </div>
                <div class="col-9">
                  <div class="ps-3">
                    <div class="text-secondary mt-1 fs-7">
                      welcome {{ profileData.firstName }}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li v-if="this.$store.state.userRole !=='admin'">
            <router-link
            
              to="profile"
              class="dropdown-item"
            >
              <span>
                <i class="bi bi-person-fill me-2" />
                <span class="fs-7">View Profile</span>
              </span>
            </router-link>
          </li>
          <li>
            <a
              class="dropdown-item "
              href="#!"
            >
              <span>
                <i class="bi bi-bell-fill me-2" />
                <span class="fs-7">Notifications</span>
              </span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <router-link
              to="setting"
              class="dropdown-item"
            >
              <span>
                <i class="bi bi-person-fill me-2" />
                <span class="fs-7">Settings</span>
              </span>
            </router-link>
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#!"
            >
              <span>
                <i class="bi bi-question-circle-fill me-2" />
                <span class="fs-7">Help Center</span>
              </span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li>
            <router-link
              to="/"
              class="dropdown-item text-center fs-7"
              @click="logout"
            >
              Log Out
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";
import Cookies from 'vue-cookies'
export default {
    name : "NavBarUser",
    data(){
        return{
          ProfileData: {},
          search:""
        }
    },
        beforeCreate () {
          this.profileData = this.$store.state.profileData;
        },    
    methods: {
      async Search() {
        window.location.href = `/findjob?search=${this.search}`;
            
            },
        async logout() {
          try{
            await axios.get('logout');
            this.$router.push('/');
            localStorage.clear();
            // Delete token cookie
    Cookies.remove('token');
    // Delete refreshToken cookie if needed
    Cookies.remove('refreshToken');
            this.$store.commit("removeUserData")
          }catch(error) {
            console.error(error);
          }
            },
        }
}

</script>

<style scoped>
@import url('https://unpkg.com/bs-brain@2.0.3/components/navbars/navbar-3/assets/css/navbar-3.css');

nav {
  max-height: 65px;
  right: 0 !important;
  left: 0px !important;
}

</style>