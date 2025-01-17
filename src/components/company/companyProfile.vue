<template>
  <section class="h-100 gradient-custom-2">
    <div class="container pb-5 h-100">
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <div class="card">
            <div
              class="rounded-top text-white d-flex flex-row bg-dark bg-gradient "
              style=" height:250px;"
            >
              <div
                class="ms-5 d-flex flex-column"
                style="width: 150px; margin-top: 100px;"
              >
                <img
                  :src="$store.state.imageUrl + userId.profileImage"
                  alt="Generic placeholder image"
                  class="img-fluid img-thumbnail mt-4 mb-2 z-1"
                >
                <router-link
                  v-if="$route.params.id === $store.state.userData._id"
                  class="btn btn-outline-primary z-1"
                  to="/setting"
                >
                  Edit profile
                </router-link>
              </div>
              
              <div
                class="ms-3 "
                style="margin-top: 180px;"
              >
                <h5>{{ companyData.companyName }}</h5>
                
                <div class="d-flex">
                  <i class="bi bi-geo-alt-fill me-1" /> <p>{{ location.city }}, {{ location.state }}</p>
                </div>
              </div>
            </div>
            <div class="p-4 text-black bg-body-tertiary">
              <div class="d-flex justify-content-end text-center py-1 text-body">
                <div class="me-5" v-if="this.$store.state.userRole ==='admin'" >
                  <p class="mb-1  h5">
                    {{ companyData?.uniqueId || '--' }}
                  </p>
                  <p class="small text-muted mb-0">
                    Identifier
                  </p>
                </div>
                <div class="me-5" v-if="this.$store.state.userRole ==='admin'" >
                  <p class="mb-1 h5">
                    {{ userId?.phone || '--' }}
                  </p>
                  <p class="small text-muted mb-0">
                    Phone 
                  </p>
                </div>
                <div>
                  <p class="mb-1 h5">
                    {{ companyData?.companySize || '--' }}
                  </p>
                  <p class="small text-muted mb-0">
                    Company Size 
                  </p>
                </div>
               
                <div class="px-3 mx-3">
                  <p class="mb-1 h5">
                    {{ companyData?.industry || '--' }}
                  </p>
                  <p class="small text-muted mb-0">
                    Industry
                  </p>
                </div>
                <div>
                  <p class="mb-1 h5">
                    {{ companyData?.culture || '--' }}
                  </p>
                  <p class="small text-muted mb-0">
                    Culture
                  </p>
                </div>
              </div>
            </div>
            <div class="card-body p-4 text-black ">
              <div class="mb-5  text-body">
                <p class="lead fw-normal mb-1">
                  About
                </p>
                <div class="p-4 bg-body-tertiary rounded">
                  <div
                    class="m-0"
                    style="white-space: pre-wrap;"
                    v-html="companyDescription"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center text-body">
                <p class="lead fw-normal mb-0">
                  Recent jobs
                </p>
              </div>
              <jobListing
                :jobs="jobs"
                :showed-job="6"
                :header-show="false"
                :no-job="count <= 0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
import axios from 'axios';
import jobListing from "../job/jobListing.vue";
  
  export default{
      name :"CompanyProfile",
      components: {
    jobListing
  },
      data(){
          return{
            companyData: {},
            location:{},
            socialMediaLinks: [],
            userId:{},
            jobs:{},
            companyDescription:'',
            count:0
           
          }
      },
       mounted(){
        this.fetchData();
      },
      methods :{
        formattedJobDescription(text) {
    return (text || '').replace(/\n/g, '<br>');
  },
        async fetchData(){
            try {
              const response = await axios.get(`company/${this.$route.params.id}`);
              this.companyData = response.data.company;
              this.userId = response.data.company.userId;
              this.location = response.data.company.userId.location;
              this.companyDescription = this.formattedJobDescription(this.companyData?.description)

             this.fetchjobs(this.companyData._id)
            } catch (error) {
              console.error(error);
            }
        },
        async fetchjobs(id){
          try {
            const response = await axios.get(`job/?pageSize=6&companyId=${id}`);
          this.jobs = response.data.jobs.map(job => ({
          ...job,
          address: job.location?.address ,
          city: job.location?.city ,
          state : job.location?.state,
          isActive : job.jobStatus === 'Working',
          profileImage : job.companyId?.profileImage,
        } 
        ));
        this.count = response.data.count
          } catch (error) {
            console.error(error);
          }
        }
      }
  }
  </script>
  
  <style >
  .max-width-150 {
    max-width: 150px !important;
  }

  </style>