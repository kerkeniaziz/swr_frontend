<template>
  <section class="bg-light mt-5">
    <div class="container ">
      <h2 class="mb-5">
        Welcome to our <b class="text-primary">Job</b> Portal
      </h2>
      <div class="row g-2 p-2 my-3 mb-5 bg-white shadow-sm rounded">
        <div class="col-md-10 my-auto">
          <div class="row g-2">
            <div class="col-md-6">
              <input
                v-model="query.search"
                type="text"
                class="form-control border-0 bg-light shadow-sm"
                placeholder="Keyword"
              >
            </div>
            <div class="col-md-6">
              <select
                v-model="query.category"
                class="form-select border-0 bg-light shadow-sm"
              >
                <option :value="''">
                  All Categories
                </option>
                <option
                  v-for="index in categorys"
                  :key="index"
                  :value="index._id"
                >
                  {{ index.categoryName }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-2 my-auto">
          <button
            class="btn btn-primary border-0 w-100"
            @click="fetchJobs"
          >
            <b> Search</b>
          </button>
        </div>
      </div>
      <div class="row gy-4 gy-lg-0">
        <JobFilter
          :categorys="categorys"
          @update:filterjobs="handelquery"
        />
        <div class="col-12 col-lg-8 col-xl-9">
          <JobListing
            :jobs="jobs"
            :page="page"
            :pages="pages"
            :total-count="totalCount"
            :pagination="true"
            @update:filterjobs="handelpage"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import JobFilter from "../components/job/jobFilter.vue"
import JobListing from "../components/job/jobListing.vue"
import axios from 'axios';
export default {
  name: 'FindJobPage',
  components : {
    JobListing,
    JobFilter
  },
  data() {
    return {
      jobs: {},
      categorys: {},
      query: {
        category: "",
        search: "",
        jobType: "",
        language: '',
        salaryRangeStart: '',
        salaryRangeEnd: '',
        experienceRequired: '',
        remoteOption: '',
        contractLength: '',
      },
      page: 1,
      pages:'',
      totalCount: '',
    }
  },
  mounted() {
    this.fetchData();
    Object.keys(this.$route.query).forEach(key => {
      if (key in this.query) {
        this.query[key] = this.$route.query[key];
      }
    });
    this.fetchJobs()
  },
  methods: {
    handelpage(page){
      this.page = page;
      this.fetchJobs()
    },
    handelquery(query) {
      Object.keys(query).forEach(key => {
        if (key in this.query) {
          this.query[key] = query[key];
        }
      });
      this.fetchJobs()
    },
    async fetchData() {
      try {
        this.loading = true;
        if (this.$store.state.categories.length !== undefined) {
          this.categorys = this.$store.state.categories;
        } else {
          const response = await axios.get(`category/?pageNumber=${this.page}`);
          this.categorys = response.data.categorys;
          this.$store.commit("setCategories", this.categorys)
        }
        this.visibleCategories = this.categorys.slice(0, this.initialDisplayCount);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchJobs() {
      try {
        const response = await axios.get(`job/?pageSize=0&pageNumber=${this.page}&categoryId=${this.query.category}&jobType=${this.query.jobType}&language=${this.query.language}&salaryRangeStart=${this.query.salaryRangeStart}&salaryRangeEnd=${this.query.salaryRangeEnd}&experienceRequired=${this.query.experienceRequired}&remoteOption=${this.query.remoteOption}&contractLength=${this.query.contractLength}&search=${this.query.search}`);
        this.jobs = response.data.jobs.map(job => ({
          ...job,
          address: job.location?.address,
          city: job.location?.city,
          state: job.location?.state,
          isActive: job.jobStatus === 'Working',
          profileImage: job.companyId?.profileImage,
        }));
        this.page = response.data.page;
      this.pages = response.data.pages;
      this.totalCount = response.data.count;

      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        this.loading = false;
      }
    },
  }
}
</script>

<style>
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
  border-color: rgba(0, 0, 0, .08);
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
  color: var(--icon-color);
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
