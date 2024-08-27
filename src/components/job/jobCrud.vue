<template>
  <div class="container p-3">
    <div class="row ">
      <button
        class="btn btn-primary add mx-3 "
        data-bs-toggle="modal"
        data-bs-target="#jobForm"
      >
        Add Job <i class="bi bi-people" />
      </button>
      <div class="col align-self-end totalUsers">
        Total Jobs: {{ totalCount }}
      </div>
    </div>
  
    <div class="row">
      <div class="col-12">
        <table class="table table-hover mt-3 text-center">
          <thead>
            <tr>  
              <th>Title</th>
              <th>Application</th>
              <th>Job Status</th>
              <th class="w-200">
                Action
              </th>
            </tr>
          </thead>
  
          <tbody id="data">
            <tr
              v-for="job in jobs"
              :key="job.id"
            >
              <th class="p-3">
                {{ job.title }}
              </th>

              <th> 
                <router-link
                  v-if="job.applications.length>0"
                  class="text-decoration-none text-primary d-block"
                  :to="`jobs/application?JobId=${job._id}`"
                >
                  <span> {{ job.applications.length }}</span>
                  <i class="bi bi-box-arrow-up-right ms-2 fw-bold" />
                </router-link>
                <span v-else> {{ job.applications.length }}</span>
              </th>
              <th> 
                <div class="form-check form-switch d-flex align-items-center justify-content-center">
                  <input 
                    :id="'switch-' + job.id" 
                    v-model="job.isActive" 
                    class="form-check-input" 
                    type="checkbox"
                    role="switch"
                    @change="toggleStatus(job)"
                  >
                  <label
                    class="form-check-label"
                    :for="'switch-' + job.id"
                  >
                    {{ job.isActive ? 'Working' : 'Stopped' }}
                  </label>
                </div>
              </th>
              <th class="w-200">
                <div class="mx-2 d-inline">
                  <router-link :to="'/job/' + job._id">
                    <i class="bi bi-eye-fill pointerIcon text-success h5" />
                  </router-link>
                </div>
                <div class="mx-3 d-inline">
                  <i
                    class="bi bi-pencil-square text-primary pointerIcon h5"
                    data-bs-toggle="modal"
                    data-bs-target="#jobForm"
                    @click="editingJob(job)"
                  />
                </div>
                <div class="mx-2 d-inline">
                  <i
                    class="bi bi-trash3 deleteIcon h5"
                    @click="deleteJob(job._id)"
                  />
                </div>
              </th>
            </tr>
          </tbody>
        </table>
          
        <div class="pagination">
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

    <JobModel
      :selected-job="selectedJob"
      :is-edit="isEdit"
      @fetch-data="fetchData"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import JobModel from '../job/JobModel.vue';

export default {
  name: 'JobCrud',
  components: {
    JobModel
  },
  data() {
    return {
      jobs: [],
      tryFetch: false,
      loading: false,
      page: 1,
      pages: 0,
      totalCount: 0,
      selectedJob: null,
      isEdit: false,
      modal: true
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    editingJob(job) {
      this.selectedJob = job;
      this.isEdit = true;
    },
    async toggleStatus(job) {
      try {
        const newStatus = job.isActive ? 'Working' : 'Stopped';
         await axios.put(`job/${job._id}`, {
          jobStatus: newStatus
        });
       
      } catch (error) {
        console.error('Error updating status:', error);
      }
    },
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.pages) {
        this.page = newPage;
        this.fetchData(); 
      }
    },

    async fetchData() {
      try {
        this.loading = true;
        const response = await axios.get(`job/?pageNumber=${this.page}&companyId=${this.$store.state.userData._id}`);
        this.jobs = response.data.jobs.map(job => ({
          ...job,
          categoryName: job.category?.categoryName || 'Uncategorized',
          isActive: job.jobStatus === "Working"
        }
        ));
        
        this.page = response.data.page;
        this.pages = response.data.pages;
        this.totalCount = response.data.count;
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      this.loading = false;
    },
    async deleteJob(id) {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
             await axios.delete(`job/${id}`);
            
            this.fetchData();
            Swal.fire({
              title: "Deleted!",
              text: "The job has been deleted.",
              icon: "success"
            });
          } catch (error) {
            console.error("Error deleting Skill:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the job.",
              icon: "error"
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
