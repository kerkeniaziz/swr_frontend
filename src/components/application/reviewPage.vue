<template>
    <div class="mt-4">
      <!-- Section - Bootstrap Brain Component -->
      <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
        <div class="d-flex justify-content-between align-items-center">
  <h3 class="card-title widget-card-title mb-4 fw-bold text-center flex-grow-1">
    Application Review
  </h3>
  <div class="ms-auto mt-0 mb-4 fw-bold me-4" :class="application.applicationStatus==='Rejected' ? 'text-danger':'d-none'">{{ application.applicationStatus }}</div>
  <div class="ms-auto mt-0 mb-4 fw-bold me-4" :class="application.applicationStatus==='Accepted' ? 'text-success':'d-none'">{{ application.applicationStatus }}</div>
  <div class="ms-auto mt-0 mb-4 fw-bold me-4" :class="application.applicationStatus==='Submitted' ? 'text-warning':'d-none'">{{ application.applicationStatus }}</div>

</div>
        <div class="container">
          <div class="row gy-3 gy-md-4">
            <div class="col-12 ">

              <div class="pb-3 pb-md-4 pb-xl-5 bg-light">
        <div class="container">
          <div class="row gy-3 gy-md-4">
            <div class="col-12 ">
              <!-- Card 2 - Bootstrap Brain Component -->
              <div class="card widget-card border-light shadow-sm h-100">
                <div class="card-body p-4">
                  <h5 class="card-title widget-card-title mb-5 text-center fw-bold">
                    Cover Letter
                  </h5>
                  
                  <div class="row gy-4 ">
                    <div class="col-12 d-flex m-2">
                      {{ application.coverLetter }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

              <!-- Card 2 - Bootstrap Brain Component -->
              <div class="card widget-card border-light shadow-sm  mx-2">
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between align-items-center">
  <h5 class="card-title widget-card-title mb-2 fw-bold text-center flex-grow-1">
    Candidate Profile
  </h5>
  <router-link :to="`/user?userId=${application.userId?._id}`">
    <i class="bi bi-box-arrow-up-right text-black"></i>
  </router-link>
</div>
                  <hr class=" w-100 border-2 border-dark mx-auto mb-5">
                  <div class="row gy-4 ">
                    <div class="col-12 d-flex">
                      <div class="col-3 pe-4 mx-5">
                        <router-link :to="`/user/${application.userId?._id}`">
                        <img
                          :src="this.$store.state.imageUrl + application.userId?.profileImage"
                          class="img-fluid rounded-circle m-auto "
                          alt="img"
                        >
                      </router-link>
                      </div>
                      <div class="w-75 ">
                        <div class="d-flex">
                          <p class="w-35">
                            First Name :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.candidateId?.firstName }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Last Name :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.candidateId?.lastName }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Email :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.userId?.email }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Phone :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.userId?.phone }}
                          </p>
                        </div>                     
                      
                        <div class="d-flex">
                          <p class="w-35">
                            Profile title :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.candidateId?.jobTitle }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Gender :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.candidateId?.gender || "none" }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Resume :
                          </p> <p class="fw-bold text-primary text-truncate w-69">
                            {{ application.candidateId?.CV }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Experience :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.candidateId?.experience || "none" }}
                          </p>
                        </div>
                        <div class="d-flex">
                          <p class="w-35">
                            Currently Position :
                          </p> <p class="fw-bold text-primary text-truncate">
                            {{ application.candidateId?.currentPosition || "none" }}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div class="pb-3 pb-md-4 pb-xl-5 bg-light my-5" v-if="application.applicationStatus ==='Submitted'">
        <div class="container">
          <div class="row gy-3 gy-md-4">
            <div class="col-12 ">
              <div class="card widget-card border-light shadow-sm h-100">
                <div class="card-body p-4">
                  <button class="btn btn-success mx-2" @click="editApplication(application,'Accepted')">Accepte</button>
                  <button class="btn btn-danger" @click="editApplication(application,'Rejected')">Reject</button>
                </div>
              </div>
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

   import axios from 'axios';
  
  export default {
      name : 'ReviewPage',
      data() {
        return {
          application:{}
        };
      },
      mounted() {
      this.loadApplication()
      },
      methods:{
        async loadApplication(){
          try{
            const response = await axios.get(`/application/${this.$route.query.applicationId}`)
            console.log(response.data)  // data from the server
            this.application = response.data?.application
          }catch(e)
          {
            console.error(e)
          }
        },
        async editApplication(application, status){
        try {
           const response = await axios.put(`application/${application._id}`,{applicationStatus:status});
           
           this.application.applicationStatus = response.data.application.applicationStatus
           console.log(this.application.applicationStatus); // data from the server

        } catch (error) {
          console.error('Error changing the status:', error);
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
  .border-end-profile {
    border-right: 2px solid #c9c9c9; /* Thickness and color of the line */    
              margin-right: 15px; /* Space between the line and adjacent content */ 
  }
  .w-35{
    width: 20% ;
    font-weight: 500;
  }
  textarea:focus{
   border: light  ;
   outline: none;
  }
  
  </style>