<template>
  <div>
    <h3 class="ms-5 mb-5">
      Vuex Store State
    </h3>
    <pre class="ms-5 mb-5"><h3>userRole</h3> {{ storeState.userRole }}</pre>
    <pre class="ms-5 mb-5"><h3>profileImage</h3> {{ storeState.profileImage }}</pre>
    <pre class="ms-5 mb-5"><h3>isLogedIn</h3> {{ storeState.isLogedIn }}</pre>
    <pre class="ms-5 mb-5"><h3>imageUrl</h3> {{ storeState.imageUrl }}</pre>
    <pre class="ms-5 mb-5"><h3>defaultImage</h3> {{ storeState.defaultImage }}</pre>
    <pre class="ms-5 mb-5"><h3>userData</h3> {{ storeState.userData }}</pre>
    <pre class="ms-5 mb-5"><h3>profileData</h3> {{ storeState.profileData }}</pre>
    <pre class="ms-5 mb-5"><h3>location</h3> {{ storeState.location }}</pre>  
    <pre class="ms-5 mb-5"><h3>socialMediaLinks</h3> {{ storeState.socialMediaLinks }}</pre>
    <pre class="ms-5 mb-5"><h3>jobs</h3> {{ storeState.jobs }}</pre>
    <pre class="ms-5 mb-5"><h3>categories</h3> {{ storeState.categories }}</pre>
  </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState([
        'userData',
        'profileData',
        'location',
        'userRole',
        'profileImage',
        'isLogedIn',
        'imageUrl',
        'categories',
        'jobs',
        'defaultImage',
        'socialMediaLinks'
      ]),
      storeState() {
        return {
          userData: this.userData,
          profileData: this.profileData,
          location: this.location,
          userRole: this.userRole,
          profileImage: this.profileImage,
          isLogedIn: this.isLogedIn,
          imageUrl: this.imageUrl,
          categories: this.categories,
          jobs: this.jobs,
          defaultImage: this.defaultImage,
          socialMediaLinks: this.socialMediaLinks
        };
      }
    }
  }
  </script>
  
  <style>
  pre {
    background-color: #8eeaff;
    padding: 10px;
    border: 2px solid #898989;
    font-weight: 900;
  }
  h3{

    font-weight: bold;
    margin-top: 0;
    margin-bottom: 5px;
  }
  </style>
  