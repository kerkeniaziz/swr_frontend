<template>
  <div class="container-xxl bg-white p-0">
    <CarouselPage />

    <div
      class="container-fluid bg-primary mb-5 wow fadeIn"
      data-wow-delay="0.1s"
      style="padding: 35px;"
    >
      <div class="row g-2">
        <div class="col-md-10">
          <div class="row g-2">
            <div class="col-md-6">
              <input
                v-model="search"
                type="text"
                class="form-control border-0"
                placeholder="Keyword"
              >
            </div>
            <div class="col-md-6">
              <select
                v-model="selectedCategory"
                class="form-select border-0"
              >
                <option
                  value=""
                  selected
                >
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
        <div class="col-md-2">
          <router-link
            class="btn btn-dark border-0 w-100"
            :to="`/findjob?search=${search}&category=${selectedCategory}`"
          >
            Find Job
          </router-link>
        </div>
      </div>
    </div>
    <!-- Search End  -->

    <!-- Category Start  -->
    <div class="container-xxl py-5">
      <div class="container">
        <h1
          class="text-center mb-5 wow "
          data-wow-delay="0.1s"
        >
          Explore By Category
        </h1>
        <div class="row g-4">
          <div
            v-for="category in visibleCategories"
            :key="category._id"
            class="col-lg-3 col-sm-6 wow "
          >
            <router-link
              :to="'/category/' + category._id"
              class="cat-item rounded p-4"
            >
              <i
                class="text-primary mb-4 fs-2"
                :class="category.icon"
              />
              <h5 class="mb-3">
                {{ category.categoryName }}
              </h5>
              <p class="mb-0">
                {{ category.jobCount }} Jobs
              </p>
            </router-link>
          </div>
        </div>
        <div class="text-center mt-4">
          <button
            v-if="visibleCategories.length < categorys.length"
            class="btn btn-outline-primary"
            @click="showMoreCategories"
          >
            Show More
          </button>
          <button
            v-else
            class="btn btn-outline-primary"
            @click="showLessCategories"
          >
            Show Less
          </button>
        </div>
      </div>
    </div>
    <!-- Category End  -->

    <!-- About Section -->
    <AboutPage :dont-show-carousel="true" />
    <!-- About Section End -->

    <!-- Jobs Start  -->

    <jobListing
      :jobs="jobs"
      :showed-job="5"
      :header-show="true"
    />
  <!-- Jobs End -->
  </div> 
</template>
<script>
import jobListing from "../components/job/jobListing.vue";
import axios from "axios";
import CarouselPage from "./carouselPage.vue";
import AboutPage from "./aboutPage.vue";

export default {
  name: "HomePage",
  components: {
    CarouselPage,
    AboutPage,
    jobListing
  },
  data() {
    return {
      categorys: [],
      loading: false,
      visibleCategories: [],
      initialDisplayCount: 8, // Number of categories to display initially
      page: 1,
      jobs:{},
      showCarousel : false,
      selectedCategory : "",
      search:""
    };
  },
  created() {
    this.fetchData(); // Fetch categories when component is created
  },

  methods: {
    formatDate(dateToFormat) {
    const date = new Date(dateToFormat);

    if (isNaN(date)) {
      return 'Invalid Date';
    }
    
    const options = {
      year: 'numeric',
      month: 'short', // Use 'short' for abbreviated month names
      day: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', options);
  },
    async fetchData() {
      try {
        this.loading = true;
        if ( this.$store.state.categories.length !== undefined ) {
          this.categorys = this.$store.state.categories;
        
        }
        else{
          const response = await axios.get(`category/?pageNumber=${this.page}`);
        this.categorys = response.data.categorys;
        this.$store.commit("setCategories", this.categorys)
        }
        this.visibleCategories = this.categorys.slice(0, this.initialDisplayCount);
        this.fetchJobs()
       
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        this.loading = false;
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
    // Method to show more categories
    showMoreCategories() {
      this.visibleCategories = this.categorys.slice(0); // Show all categories
    },
    // Method to show less categories
    showLessCategories() {
      this.visibleCategories = this.categorys.slice(0, this.initialDisplayCount); // Show initial categories
    }
  }
};
</script>

<style scoped>
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
.bi{
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
  font-size:40px !important;
  font-weight: 900;
}
.cat-item i:hover {
  color: var(--icon-color-hover); /* Bootstrap primary color */
}
.cat-item h5{
  color: grey;
}

/*** Category ***/
.cat-item {
    display: block;
    box-shadow: 0 0 45px rgba(0, 0, 0, .08);
    border: 1px solid transparent;
    transition: .5s;
}

.cat-item:hover {
    border-color: rgba(0, 0, 0, .08);
    box-shadow: none;
}
</style>