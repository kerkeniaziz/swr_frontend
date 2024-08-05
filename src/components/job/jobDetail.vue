<template>
  <div class="container-xxl bg-white p-0">
    <!-- Header End -->
    <div
      class="container-xxl py-5 bg-dark page-header mb-5"
      :style="backgroundStyle"
    >
      <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">
          Job Detail
        </h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb text-uppercase">
            <li class="breadcrumb-item">
              <router-link to="/">
                Home
              </router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/findjob">
                Find Job
              </router-link>
            </li>
            <li
              class="breadcrumb-item text-white active"
              aria-current="page"
            >
              Job Detail
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Header End -->

    <!-- Job Detail Start -->
    <div
      class="container-xxl py-5 wow fadeInUp mb-5"
      data-wow-delay="0.1s"
    >
      <div class="container">
        <div class="row gy-5 gx-4">
          <div class="col-lg-8">
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center mb-5">
                <img
                  class="flex-shrink-0 img-fluid border rounded"
                  :src="this.$store.state.imageUrl + job.jobImage "
                  alt="jobImage"
                  style="width: 80px; height: 80px;"
                >
                <div class="text-start ps-4">
                  <h3 class="mb-3"> 
                    {{ job.title }}
                  </h3>
                  <span class="text-truncate me-3"><i class="bi bi-geo-alt-fill text-primary me-2" />{{ job.city }}, {{ job.state }} </span>
                  <span class="text-truncate me-3"><i class="bi bi-clock text-primary me-2" />{{ job.jobType }}</span>
                  <span class="text-truncate me-0"><i class="bi bi-cash-coin text-primary me-2" />${{ job.salaryRangeStart }} - ${{ job.salaryRangeEnd }}</span>
                </div>
              </div>
              <div v-if="isCandidate" class="w-30">
                <span class="my-auto fw-bold me-2"> {{ isSaved ? 'The job is saved :' :'Save the job :' }}</span>
                <button
                  class=" p-1 px-2  "
                  :class="isSaved ? 'border-0 bg-white text-primary' : 'btn btn-primary ' "
                  @click="isSaved = !isSaved; saveJob()"
                >
                  <i
                    class="bi  fs-5 my-auto"
                    :class="isSaved ? 'bi-bookmark-fill fs-5' : 'bi-bookmark-fill fs-5 ' "
                  />
                </button>
              </div>
            </div>

            <div class="mb-5">
              <h4 class="mb-3">
                Job description
              </h4>
              <!-- <pre>{{ job.description }}</pre> -->

              <div v-html="jobDescription" style="white-space: pre-wrap;"></div>
              <hr class="border-3 col-11 mx-auto my-5">
              <h4 class="mb-3">
                Job Requirements
              </h4>
          
              <div v-html="jobRequirement" style="white-space: pre-wrap;"></div>
              <hr class="border-3 col-11 mx-auto my-5">
            </div>
            
            <div>
              <span class="ms-2 fw-bold">Skills :</span> 
              <div
                v-for="skill in skills"
                :key="skill.id"
                class="d-felx flex-row mb-3 mx-2 tag mt-2 "
              >
                {{ skill }}
              </div>
              <br>    
              <span class="ms-2 fw-bold">Languages :</span> 
              <div
                v-for="lang in language"
                :key="lang.id"
                class="d-felx flex-row mb-3 mx-2 tag mt-2 "
              >
                {{ lang }}
              </div>
            </div>
          </div>
       
          <div class="col-lg-4">
            <div
              class="bg-light rounded p-5 mb-4 wow slideInUp"
              data-wow-delay="0.1s"
            >
              <h4 class="mb-4">
                Job Summery
              </h4>
              
              <p><i class="bi bi-caret-right-fill text-primary me-2" />Vacancy: {{ job?.vacancy }}</p>
              <p><i class="bi bi-caret-right-fill text-primary me-2" />Job Nature: {{ job.jobType }}</p>
              <p><i class="bi bi-caret-right-fill text-primary me-2" />Salary: ${{ job.salaryRangeStart }} - ${{ job.salaryRangeEnd }}</p>
              <p><i class="bi bi-caret-right-fill text-primary me-2" />Location: {{ job.city }}, {{ job.state }}</p>
              <p><i class="bi bi-caret-right-fill text-primary me-2" />Published On: {{ formatDate(job?.createdAt ) }}</p>
            </div>
                          
            <div
              class="bg-light rounded p-5 wow slideInUp"
              data-wow-delay="0.1s"
            >
              <h4 class="mb-4 ">
                Company Detail
              </h4>
              <h5>{{ company.companyName }}</h5>
              <div class="m-0" v-html="companyDescription" style="white-space: pre-wrap;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Job Detail End -->
    <div class="details-footer sticky-footer bg-light border-top py-2" v-if="isCandidate">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
          <button class="btn btn-apply btn-primary btn-lg btn-block my-2">
            <router-link
              :to="`/application/overview?JobId=${job._id}`"
              class="text-white text-decoration-none"
            >
              Postuler maintenant
            </router-link> 
          </button>
        </div>
        <div class="social-share d-flex align-items-center">
          <span class="social-share__title">Partagez cette offre:</span>
          <div class="social-share__icons d-flex ml-3">
            <a
              href="#"
              class="social-share__icon"
              aria-label="Facebook"
            >
              <img
                src="https://ws.sharethis.com/images/2017/facebook_32.png"
                alt="Facebook"
              >
            </a>
            <a
              href="#"
              class="social-share__icon ml-2"
              aria-label="Twitter"
            >
              <img
                src="https://ws.sharethis.com/images/2017/twitter_32.png"
                alt="Twitter"
              >
            </a>
            <a
              href="#"
              class="social-share__icon ml-2"
              aria-label="Google Plus"
            >
              <img
                src="https://ws.sharethis.com/images/2017/googleplus_32.png"
                alt="Google Plus"
              >
            </a>
            <a
              href="#"
              class="social-share__icon ml-2"
              aria-label="LinkedIn"
            >
              <img
                src="https://ws.sharethis.com/images/2017/linkedin_32.png"
                alt="LinkedIn"
              >
            </a>
            <a
              href="#"
              class="social-share__icon ml-2"
              aria-label="Pinterest"
            >
              <img
                src="https://ws.sharethis.com/images/2017/pinterest_32.png"
                alt="Pinterest"
              >
            </a>
            <a
              href="#"
              class="social-share__icon ml-2"
              aria-label="Email"
            >
              <img
                src="https://ws.sharethis.com/images/2017/email_32.png"
                alt="Email"
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'JobDetail',
    data() {
        return {
            job:{},
            skills :{},
            company : {},
            language:{},
            backgroundStyle: {},
            isSaved: false,
            isCandidate: false,
            jobDescription: '',
            jobRequirement:'',
            companyDescription: ''

        }
    },
    mounted() {
      this.isCandidate = this.$store.state.userRole === "candidate";
      this.isSavedJob();
      this.fetchJobDetail();
    },

    methods: {
      formattedJobDescription(text) {
    return (text || '').replace(/\n/g, '<br>');
  },
      async isSavedJob(){
        if (this.isCandidate){
          try{
            const response =await axios.get(`candidate/${this.$store.state.profileData._id}`);
        console.log("dqsfqsdfsdf",response);
          this.isSaved = response.data.candidate.savedJobs.includes(this.$route.params.id)
          }catch(e) {
            console.error(e);
          }
        }
      },
      async saveJob() {
        try {
          const response =await axios.put(`candidate/saveJob/${this.$route.params.id}`);
          this.isSaved= !response.data.remove
        }catch (e) {
          console.error(e);
        }
      },
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
        async fetchJobDetail(){
            try {
                const response = await axios.get(`job/${this.$route.params.id}`);
                console.log(response)
                const job = response.data.job;
                this.skills = response.data.job.skills;
                this.language = response.data.job.language;
                this.company = response.data.company;
                this.job = {
          ...job,
          jobImage: response.data.job?.companyId?.profileImage,
          city: response.data.job?.location?.city,
          state: response.data.job?.location?.state,
        }
        this.jobRequirement = this.formattedJobDescription(response.data.job?.requirement)
        this.companyDescription = this.formattedJobDescription(this.company.description)
        this.jobDescription = this.formattedJobDescription(response.data.job?.description)
        this.backgroundStyle = {
        background: `linear-gradient(rgba(43, 57, 64, .5), rgba(43, 57, 64, .5)), url(${this.$store.state.imageUrl + job.cover }) center center no-repeat`,
        backgroundSize: 'cover',
      };

            }
            catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style>
.w-30{
  width: 30%;
}
.tag {
  display: inline-block;
  padding: 0.25em 0.75em;
  font-size: 0.875rem;
  color: white;
  background-color: #007bff;
  border-radius: 0.25rem;
}

.breadcrumb-item a {
    text-decoration: none;
    color:      var(--bs-heading-color);
    font-weight: 800;
}
/*** Header ***/
.header-carousel .container,
.page-header .container {
    position: relative;
    padding: 45px 0 45px 35px;
    border-left: 15px solid var(--primary);
}

.header-carousel .container::before,
.header-carousel .container::after,
.page-header .container::before,
.page-header .container::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100px;
    height: 15px;
    background: var(--primary);
}

.header-carousel .container::after,
.page-header .container::after {
    top: 100%;
    margin-top: -15px;
}

@media (max-width: 768px) {
    .header-carousel .owl-carousel-item {
        position: relative;
        min-height: 500px;
    }
    
    .header-carousel .owl-carousel-item img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .header-carousel .owl-carousel-item p {
        font-size: 14px !important;
        font-weight: 400 !important;
    }

    .header-carousel .owl-carousel-item h1 {
        font-size: 30px;
        font-weight: 600;
    }
}

.header-carousel .owl-nav {
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
}

.header-carousel .owl-nav .owl-prev,
.header-carousel .owl-nav .owl-next {
    margin: 7px 0;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    background: transparent;
    border: 1px solid #FFFFFF;
    border-radius: 2px;
    font-size: 22px;
    transition: .5s;
}

.header-carousel .owl-nav .owl-prev:hover,
.header-carousel .owl-nav .owl-next:hover {
    background: var(--primary);
    border-color: var(--primary);
}

.breadcrumb-item + .breadcrumb-item::before {
    color: var(--light);
}
.sticky-footer {
      position: fixed;
      bottom: 0;
      left: 80px;
      right: 0;

    }
    .social-share__icon img {
  width: 32px;
  height: 32px;
  margin-left: 5px;
  display: inline-block;
}
</style>