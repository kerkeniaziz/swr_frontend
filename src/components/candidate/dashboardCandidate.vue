<template> 
  <div class="mt-4">
    <!-- Section - Bootstrap Brain Component -->
    <!-- Card 1 - Bootstrap Brain Component -->
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <h2 class="ms-3 my-3">
        Welcome <b class="text-primary">{{ $store.state.profileData.firstName }} {{ $store.state.profileData.lastName }}</b>
      </h2>
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 col-sm-6 col-xl-4 mx-auto">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/dashboard/jobapplied">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-send fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Job Applied
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ jobApplied }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-xl-4 mx-auto">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/dashboard/savedjobs">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-bookmark-fill fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Saved Jobs
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ savedJobs }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
        
          <div class="col-12 col-sm-6 col-xl-4 mx-auto">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/findjob">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-briefcase fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Jobs for you
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ totalJob }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section - Bootstrap Brain Component -->
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 ">
            <!-- Card 2 - Bootstrap Brain Component -->
            <div class="card widget-card border-light shadow-sm h-100">
              <div class="card-body p-4">
                <h3 class="card-title widget-card-title mb-2 text-center fw-bold">
                  My Profile
                </h3>
                <hr class=" w-100 border-2 border-dark mx-auto mb-5">
                <div class="row gy-4 ">
                  <div class="col-12 d-flex">
                    <div class="col-2 pe-4">
                      <img
                        :src="$store.state.profileImage"
            
                        class="img-fluid rounded-circle m-auto "
                        alt="Luke Reeves"
                      >
                    </div>
                    <div class="col-5 border-end-profile ">
                      <div class="d-flex">
                        <p class="w-35">
                          Name :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.firstName }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Last Name :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.lastName }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Email :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.userData.email }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Phone :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.userData.phone }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Date of birth :
                        </p> <p class="fw-bold text-primary text-truncate ">
                          {{ dateOfBirth || "none" }}
                        </p>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="d-flex">
                        <p class="w-35">
                          Profile title :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.jobTitle }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Gender :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.gender || "none" }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Resume :
                        </p> <p class="fw-bold text-primary text-truncate w-69">
                          {{ $store.state.profileData.CV }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Experience :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.experience || "none" }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Currently Position :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.currentPosition || "none" }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 ms-2 mt-4">
                    <router-link
                      class="d-flex text-primary col-2 "
                      to="/setting"
                    >
                      <i class="bi bi-pencil-fill my-auto" />
                      <p class="my-auto ms-2 fw-bold">
                        Edite Profile
                      </p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section - Bootstrap Brain Component -->
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 ">
            <!-- Card 2 - Bootstrap Brain Component -->
            <div class="card widget-card border-light shadow-sm h-100">
              <div class="card-body p-4">
                <h3 class="card-title widget-card-title mb-4">
                  Latest Jobs :
                </h3>
                <div class="row gy-4">
                  <div class="col-12">
                    <jobListing
                      :jobs="jobs"
                      :showed-job="5"
                      :header-show="false"
                      :pagination="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import jobListing from '../job/jobListing.vue';
import axios from 'axios';

export default {
    name : 'DashboardCandidate',
    components: {
      jobListing
    },
    data() {
      return {
        jobs:{},
        totalJob:0,
        dateOfBirth:"",
        savedJobs:0,
        jobApplied:0
      };
    },
    mounted() {
      this.fetchJobs()
      this.truncatedDateOfBirth()
    },

    methods:{
      truncatedDateOfBirth() {
      // Access the dateOfBirth from the Vuex store
      const dateOfBirth = this.$store.state.profileData.dateOfBirth;
      // Ensure it's a string and truncate
      this.dateOfBirth = dateOfBirth ? dateOfBirth.toString().substring(0, 10) : '0000-00-00';
    },
      async fetchJobs() {
      try {
        const response = await axios.get("/application/total")
        this.jobApplied = response.data.total
        const response1 = await axios.get("/job/savedjobs?pageSize=1")
        this.savedJobs = response1.data.count
        if ( this.$store.state.jobs.length !== undefined ) {
          this.jobs = this.$store.state.jobs;
          
          this.totalJob = this.$store.state.jobs.length;

        }
        else{
          const response = await axios.get('job/?pageSize=0');
          this.jobs = response.data.jobs.map(job => ({
          ...job,
          address: job.location?.address ,
          city: job.location?.city ,
          state : job.location?.state,
          isActive : job.jobStatus === 'Working',
          profileImage : job.companyId?.profileImage,
        }
        ));
        this.totalJob = response.data.count;
        this.$store.commit("setJobs", this.jobs)

        }

      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        this.loading = false;
      }
    },

    },
 
};
</script>

<style scoped>
.card a {
  text-decoration: none;
  color: inherit;
}
.border-end-profile {
  border-right: 2px solid #c9c9c9; /* Thickness and color of the line */    
            margin-right: 15px; /* Space between the line and adjacent content */ 
}
.w-35{
  width: 31% ;
  font-weight: 500;
}
.w-69{
  max-width: 69% !important;
}
</style>