<template>
  <div>
    <!-- Jobs Start  -->
    <div class="container-xxl pb-5 ">
      <div class="container">
        <h1
             
          class="text-center mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          Job Applied
        </h1>
            
        <div
          class="tab-class text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div class="tab-content">
            <div
              v-for="(job, index) in jobs"
              id="tab-1"
              :key="index"
              class="tab-pane fade show p-0 active"
            >
              <router-link
                :to="'/job/' + job._id"
              >
                <div
                  v-show="index < showedJob && job.isActive"
                  class="job-item"
                  :style="{ 'margin-bottom' : job.isActive ? '24px' : '0', padding: job.isActive ? '24px' : '0' }"
                >
                  <div class="row g-4">
                    <div class="col-sm-12 col-md-8 d-flex align-items-center">
                      <img
                        class="flex-shrink-0 img-fluid border rounded"
                        :src="$store.state.imageUrl + job.profileImage"
                        alt=""
                        style="width: 80px; height: 80px;"
                      >
                      <div class="text-start ps-4">
                        <div>
                          <h5 class="mb-3 text-truncate">
                            {{ job.title }}
                          </h5>
                          <span class="text-truncate me-3"><i class="bi bi-geo-alt-fill text-primary me-2" />{{ job.city }}, {{ job.state }} </span>
                          <span class="text-truncate me-3"><i class="bi bi-clock text-primary me-2" />{{ job.jobType }}</span>
                          <span class="text-truncate me-0"><i class="bi bi-cash-coin text-primary me-2" />${{ job.salaryRangeStart }} - ${{ job.salaryRangeEnd }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                      <div class=" mb-3">
                        <div class="fw-bold mb-3">
                          Application Status
                        </div>
                        <div
                          v-if="job.applicationStatus ==='Submitted'"
                          class="text-warning  fw-bold"
                        >
                          {{ job.applicationStatus }}
                        </div>
                        <div
                          v-if="job.applicationStatus ==='Rejected'"
                          class="text-danger  fw-bold"
                        >
                          {{ job.applicationStatus }}
                        </div>
                        <div
                          v-if="job.applicationStatus ==='Accepted'"
                          class="text-success  fw-bold"
                        >
                          {{ job.applicationStatus }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
    
        <div
          v-show="noJob"
          class="mb-4 p-4"
        >
          <div class="row g-4">
            <h5 class="mb-3">
              No Job Application Available 
            </h5>
          </div>
        </div>
    
        <div
          v-show="pagination "
          class="pagination"
        > 
          <button
            :disabled="page === 1"
            @click="changePage(page - 1)"
          >
            &lt;
          </button>
          <span>Page {{ page }} of {{ pages }}</span>
          <button
            :disabled="page === pages"
            @click="changePage(page + 1)"
          >
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
    import axios from 'axios';
    export default {
      name: 'JobApplied',
      data() {
        return {
          noJob: false,
          pagination:true,
          jobs:{},
          page: 0,
          pages: 0,
          totalCount: 0,
          showedJob : 5
        }
      },
      mounted() {
       this.jobApplied()
      },
      methods: {
          async jobApplied() {
              try {
              const response = await axios.get("/job/jobApplied?pageSize=5")
              const applications = response.data.application || [];
const jobs = response.data.jobs || [];

// Map jobs and add applicationStatus if jobId matches
this.jobs = jobs.map(job => {
    // Find the application status for the current job
    const application = applications.find(app => app.jobId === job._id);
    return {
        ...job,
        applicationStatus: application ? application.applicationStatus : null,
        isActive: job.jobStatus === "Working",
        profileImage: job.companyId?.profileImage
    };
});
          this.page = response.data.page;
          this.pages = response.data.pages;
          this.totalCount = response.data.count;
          this.noJob = this.totalCount < 0;
              }catch (e) {
                  console.error('Error fetching applied jobs:', e);
              }
          },
        changePage(newPage) {
        if (newPage > 0 && newPage <= this.pages) {
          this.page = newPage;
      this.jobApplied();
        }
      },
      }
    }
    </script>
    
    <style>
    .jobtitle-truncate {
      max-width: 200px;
      max-height: 80px;
    
    }
    .view-toggle {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100px;
      height: 40px;
      padding: 0;
      background-color: #f8f9fa;
      overflow: hidden;
      border: none;
    }
    
    .view-toggle i {
      flex: 1;
      text-align: center;
      transition: background-color 0.3s;
      color: grey;
      padding: 8px;
    }
    
    .view-toggle i.active {
      background-color: var(--icon-color);
      color: white; /* Optional: to change the icon color to white when active */
    }
    
    .view-toggle .slider {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      background-color: lightblue;
      transition: transform 0.3s;
      z-index: -1;
    }
    
    .view-toggle .slider.list {
      transform: translateX(0);
    }
    
    .view-toggle .slider.card {
      transform: translateX(100%);
    }
    
    /*** Job Listing ***/
    .nav-pills .nav-item .active {
      border-bottom: 2px solid var(--primary);
    }
    .job-item {
      border: 1px solid transparent;
      border-radius: 2px;
      box-shadow: 0 0 45px rgba(0, 0, 0, .08);
      transition: .5s;
    }
    .job-item:hover {
    
      border-color: rgba(0, 0, 0, 0.204);
      box-shadow: none;
    }
    .bi {
      font-size: 18px;
      font-weight: bold;
    }
    .cat-item {
      display: block;
      box-shadow: 0 0 45px rgba(0, 0, 0, 0.08);
      border: 1px solid transparent;
      transition: 0.5s;
      width: 100%;
      height: 100%;
      text-decoration: none;
    }
    .cat-item:hover {
      border-color: rgba(0, 0, 0, 0.08);
      box-shadow: none;
    }
    .btn-primary {
      background-color: var(--icon-color);
      border-color: var(--icon-color);
    }
    .btn-primary:hover {
      background-color: var(--icon-color-hover);
      border-color: var(--icon-color-hover);
    }
    .cat-item i {
      color: var(--icon-color); /* Bootstrap primary color */
      font-size: 40px !important;
      font-weight: 900;
    }
    .cat-item i:hover {
      color: var(--icon-color-hover);
    }
    .cat-item h5 {
      color: grey;
    }
    a{
        color: var(--bs-heading-color);
        text-decoration: none;
    }
    </style>
    