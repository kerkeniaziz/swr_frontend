<template>
  <div class="container p-3">
    <div class="row ">
      <div class="col totalUsers mb-2">
        Total Application: {{ totalCount }} 
      </div>
    </div>

    <div
      class="tab-class text-center wow fadeInUp"
      data-wow-delay="0.3s"
    >
      <div class="tab-content bg-white shadow rounded py-4">
        <div
          v-for="application in applications"
          id="tab-1"
          :key="application.id"
          class="tab-pane fade show p-0 active"
        >
          <div
                    
            class="app-item mt-2"
          >
            <div class="row g-4 shadow border-ligth rounded m-3">
              <div class="col-sm-12 col-md-6 d-flex align-items-center">
                <router-link
                  :to="`/user/${application.userId?._id}`"
                  class="text-black text-decoration-none d-flex flex-column"
                >
                  <div class="d-flex align-items-start">
                    <img
                      class="flex-shrink-0 img-fluid border rounded"
                      :src="$store.state.imageUrl + application.userId?.profileImage"
                      alt="profile image"
                      style="width: 80px; height: 80px;"
                    >
                    <div class="text-start ps-4">
                      <div>
                        <h5 class="mb-3 text-truncate">
                          {{ application.candidateId?.firstName }} {{ application.candidateId?.lastName }}
                          <span class="fs-8 text-primary text-decoration-underline">View</span>
                        </h5>
                        <span class="text-truncate">{{ application.candidateId?.jobTitle }}</span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-sm-12 col-md-2 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                <div class=" mb-3">
                  <div class="fw-bold mb-3">
                    Match Score
                  </div>
                  <div
                    class="fw-bold"
                  >
                    {{ application?.matchScore || "--" }}
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-2 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                <div class=" mb-3">
                  <div class="fw-bold mb-3">
                    Application Status
                  </div>
                  <div
                    v-if="application.applicationStatus ==='Submitted'"
                    class="text-warning  fw-bold"
                  >
                    Submitted
                  </div>
                  <div
                    v-if="application.applicationStatus ==='Rejected'"
                    class="text-danger  fw-bold"
                  >
                    Rejected
                  </div>
                  <div
                    v-if="application.applicationStatus ==='Accepted'"
                    class="text-success  fw-bold"
                  >
                    Accepted
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-2 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                <div class=" mb-3">
                  <div class="fw-bold mb-3">
                    Action
                  </div>
                        
                  <div class="mx-3 d-inline">
                    <router-link :to="`/jobs/application/review?applicationId=${application._id}`">
                      <i class="bi bi-eye-fill pointerIcon fs-4 my-auto mx-2 text-success" />
                    </router-link>
                  
                    <i
                      v-if="application.applicationStatus === 'Submitted'"
                      class="bi bi-check text-primary pointerIcon fs-2 my-auto mx-2 "
                      @click="editApplication(application,'Accepted')"
                    />
                    <i
                      v-if="application.applicationStatus === 'Submitted'"
                      class="bi bi-x deleteIcon fs-2 my-auto mx-2 "
                      @click="editApplication(application,'Rejected')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'JobApplication',
    
    data() {
      return {
        applications:{},
        page: 1,
        pages: 1,
        totalCount: 0,
        response : {}
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      changePage(newPage) {
        if (newPage > 0 && newPage <= this.pages) {
          this.page = newPage;
          this.fetchData();
        }
      },
  
      async fetchData() {
  try {
    if (this.$route.query.JobId)
  {
    console.log(this.$route.query)
     this.response = await axios.get(`application/?pageNumber=${this.page}&jobId=${this.$route.query.JobId}`);
  }
  else
  {
    console.log(this.$route.query)
   this.response = await axios.get(`applicationC/?pageNumber=${this.page}`);
}

    // Sort the applications by matchScore in descending order
    this.applications = this.response.data.applications.sort((a, b) => {
      return (b.matchScore || 0) - (a.matchScore || 0);
    });

    this.page = this.response.data.page;
    this.pages = this.response.data.pages;
    this.totalCount = this.response.data.count;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
},

      async editApplication(application, status){
        try {
           await axios.put(`application/${application._id}`,{applicationStatus:status});
           this.fetchData();
        } catch (error) {
          console.error('Error changing the status:', error);
        }
      }, 
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  