<template> 
  <div class="mt-4">
    <!-- Section - Bootstrap Brain Component -->
    <!-- Card 1 - Bootstrap Brain Component -->
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 col-sm-6 col-xl-3">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/users">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-people fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Total Users
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ totalUser }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
        
          <div class="col-12 col-sm-6 col-xl-3">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/jobs">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-briefcase fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Total Job
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ totalJob }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-xl-3">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/skills">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-ui-checks fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Total Skills
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ totalSkill }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-xl-3">
            <div class="card widget-card border-light shadow-sm">
              <router-link to="/skills">
                <div class="card-body p-4 text-center">
                  <div class="lh-1 d-flex align-items-center justify-content-center">
                    <i class="bi bi-grid-3x3-gap fs-3 p-3 text-white bg-primary rounded-circle" />
                  </div>
                  <br>
                  <h3 class="card-title widget-card-title mb-3">
                    Total Categories
                  </h3>
                  <h4 class="card-subtitle text-body-secondary m-0">
                    {{ totalCategory }}
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
    name : 'DashboardAdmin',
    components: {
      jobListing
    },
    data() {
      return {
        jobs:{},
        totalUser:0,
        totalJob:0,
        totalSkill:0,
        totalCategory:0
      };
    },
    mounted() {
      
      this.fetchStats()
      this.fetchJobs()
    },

    methods:{
      async fetchStats (){
        try {
          const response = await axios.get('/admin/stats')
          this.totalUser = response.data.countUser;
          this.totalJob = response.data.countJob;
          this.totalSkill = response.data.countJob;
          this.totalCategory = response.data.countCategory;
        } catch (error) {
          console.error('Error fetching stats', error);
        }
      },
      async fetchJobs() {
      try {
        if ( this.$store.state.jobs.length !== undefined ) {
          this.jobs = this.$store.state.jobs;

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
</style>