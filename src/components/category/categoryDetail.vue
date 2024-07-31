<template>
  <div class="container-xxl border-light shadow-sm bg-white p-0 mb-5">
    <h2 class=" mb-3 mt-5 pt-5 animated slideInDown text-center">
      {{ category }}
    </h2>

    <!-- Jobs Start  -->
    <JobListing
      :jobs="jobs"
      :no-job="noJob"
    />
    <!-- Jobs End -->
  </div>
</template>

<script>
import JobListing from "../job/jobListing.vue"
import axios from 'axios';
export default {
name: 'CategoryDetail',
components : {
    JobListing
},
data() {
    return {
        jobs:{},
        category :"",
        noJob:false
       
    }
},
mounted() {
    this.fetchJobs();
    this.fetchCategoryName();
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
async fetchCategoryName(){
    try {
            const response = await axios.get(`category/${this.$route.params.id}`);
            this.category = response.data.category.categoryName;
        }
        catch (error) {
            console.error(error);
        }
},
    async fetchJobs(){
        try {
            const response = await axios.get(`job/?categoryId=${this.$route.params.id}`);
             this.jobs = response.data.jobs.map(job => ({
          ...job,
          city: job.location?.city ,
          state : job.location?.state,
          isActive : job.jobStatus === 'Working',
          profileImage : job.companyId?.profileImage,
        }
        ));
        if (response.data.jobs.length === 0)
        {
            this.noJob= true
        }
        else  this.noJob= false

        }
        catch (error) {
            console.error(error);
        }
    }
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

</style>    