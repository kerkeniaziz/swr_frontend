<template>
  <div>
    <!-- Jobs Start  -->
    <div class="container-xxl pb-5 ">
      <div class="container">
        <h1
          v-show="headerShow1"
          class="text-center mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          Job Listing
        </h1>
        
        <div
          class="tab-class text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <!-- View Switcher Buttons -->
          <div class="d-flex justify-content-end mb-4 p-1 rounded">
            <button
              class="btn view-toggle bg-white"
              @click="toggleView"
            >
              <i
                class="bi bi-list"
                :class="{ 'active': view === 'list' }"
              />
              <i
                class="bi bi-grid"
                :class="{ 'active': view === 'card' }"
              />
              <div
                class="slider"
                :class="view"
              />
            </button>
          </div>

          <div class="tab-content">
            <div v-if="view === 'list'">
              <div
                v-for="(job, index) in jobs"
                id="tab-1"
                :key="job._id"
                class="tab-pane fade show p-0 active"
              >
                <div
                  v-show="index < showedJob1 && job.isActive"
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
                      <div class="d-flex mb-3">
                        <router-link
                          :to="'/job/' + job._id"
                          class="btn btn-primary"
                        >
                          View Job
                        </router-link>
                      </div>
                      <small class="text-truncate"><i class="bi bi-calendar4-week text-primary me-2" />Date Line: {{ formatDate(job?.createdAt ) }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else-if="view === 'card'"
              class="row"
            >
              <div
                v-for="(job, index) in jobs"
                :key="job._id"
                class="col-md-4 mb-4"
              >
                <div
                  v-show="index < showedJob1 && job.isActive"
                  class="job-item p-3 h-100 mb-3"
                >
                  <div class="d-flex">
                    <img
                      class="flex-shrink-0 img-fluid border rounded align-self-start"
                      :src="$store.state.imageUrl + job.profileImage"
                      alt=""
                      style="width: 50px; height: 50px;"
                    >
                    <h5 class="mb-1 text-start ps-3 text-truncate jobtitle-truncate">
                      {{ job.title }}
                    </h5>
                  </div>
                  <div class="align-bottom text-start ">
                    <br>
                    <small class="text-truncate d-block my-1"><i class="bi bi-geo-alt-fill text-primary me-1" />{{ job.city }}, {{ job.state }}</small>
                    <small class="text-truncate d-block my-1"><i class="bi bi-clock text-primary me-1" />{{ job.jobType }}</small>
                    <small class="text-truncate d-block my-1"><i class="bi bi-cash-coin text-primary me-1" />${{ job.salaryRangeStart }}K - ${{ job.salaryRangeEnd }}K</small>
                    <small class="text-truncate d-block my-1"><i class="bi bi-calendar4-week text-primary me-2" />Date Line: {{ formatDate(job?.createdAt ) }}</small>
                  </div>
                  
                  <router-link
                    :to="'/job/' + job._id"
                    class="btn btn-primary w-100 align-bottom"
                  >
                    View Job
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
                  No Job Available For Now
                </h5>
              </div>
            </div>

            <router-link
              v-show="headerShow1"
              class="btn btn-primary py-3 px-5"
              to="/findjob"
            >
              Browse More Jobs
            </router-link>

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
    </div> 
  <!-- Jobs End -->
  </div>
</template>

<script>
export default {
  name: 'JobListing',
  props: {
    jobs: {
      type: Object,
      default: () => {}
    },
    noJob: Boolean,
    showedJob: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    },
    pages: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    },
    
    headerShow: Boolean,
    pagination: Boolean,
  },
  data() {
    return {
      showedJob1: 1,
      headerShow1: false,
      view: 'list'
    }
  },
  mounted() {
    if (this.headerShow){
      this.headerShow1 = this.headerShow;
    }

    if (!this.showedJob){
      this.showedJob1 = 555;
    } else {
      this.showedJob1 = this.showedJob;
    }
  },
  methods: {
    changePage(newPage) {
    if (newPage > 0 && newPage <= this.pages) {
      this.$emit('update:filterjobs', newPage);
    }
  },
    formatDate(dateToFormat) {
      const date = new Date(dateToFormat);
      if (isNaN(date)) {
        return 'Invalid Date';
      }
      const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      };
      return date.toLocaleDateString('en-US', options);
    },
    toggleView() {
      this.view = this.view === 'list' ? 'card' : 'list';
    }
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
</style>
