<template>
  <div class="mt-4">
    <!-- Section - Bootstrap Brain Component -->
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <h3 class="card-title widget-card-title mb-4 text-center fw-bold">
        Application Overview
      </h3>
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 ">
            <!-- Card 2 - Bootstrap Brain Component -->
            <div class="card widget-card border-light shadow-sm h-100">
              <div class="card-body p-4">
                <h5 class="card-title widget-card-title mb-2 text-center fw-bold">
                  Profile
                </h5>
                <hr class=" w-100 border-2 border-dark mx-auto mb-5">
                <div class="row gy-4 ">
                  <div class="col-12 d-flex">
                    <div class="col-3 pe-4 mx-5">
                      <img
                        :src="$store.state.profileImage"
            
                        class="img-fluid rounded-circle m-auto "
                        alt="Luke Reeves"
                      >
                    </div>
                    <div class="w-75 ">
                      <div class="d-flex">
                        <p class="w-35">
                          Name :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.firstName }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Last Name :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.lastName }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Email :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.userData.email }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Phone :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.userData.phone }}
                        </p>
                      </div>                     
                    
                      <div class="d-flex">
                        <p class="w-35">
                          Profile title :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.jobTitle }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Gender :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.gender || "none" }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Resume :
                        </p>
                         
                        <div class="fw-bold text-primary text-truncate w-69 ">
                          <!-- Check if the string ends with .pdf -->
                          <div v-if="$store.state.profileData.CV.endsWith('.pdf')">
                            <router-link
                              :to="`/pdf/${$store.state.profileData.CV}`"
                              target="_blank"
                              class="d-flex text-decoration-underline"
                            >
                              <p class="fw-bold text-primary text-truncate w-69"> 
                                {{ $store.state.profileData.CV }}
                              </p>
                              <i class="bi bi-box-arrow-up-right ps-3 " />
                            </router-link>
                          </div>
                          <!-- Check if the string ends with .docx -->
                          <div v-else-if="$store.state.profileData.CV.endsWith('.docx')">
                            <router-link
                              :to="`/doc/${$store.state.profileData.CV}`"
                              target="_blank"
                              class="d-felx text-decoration-underline"
                            >
                              <p class="fw-bold text-primary text-truncate w-69"> 
                                {{ $store.state.profileData.CV }}
                              </p>
                              <i class="bi bi-box-arrow-up-right ms-3 " />
                            </router-link>
                          </div>
                        </div>
                      </div>
                      
                      <div class="d-flex">
                        <p class="w-35">
                          Experience :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.experience || "none" }}
                        </p>
                      </div>
                      <div class="d-flex">
                        <p class="w-35">
                          Currently Position :
                        </p> <p class="fw-bold text-primary text-truncate">
                          {{ $store.state.profileData.currentPosition || "none" }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 ms-2 mt-4">
                    <router-link
                      class="d-flex text-primary col-2 "
                      to="/setting"
                    >
                      <i class="bi bi-pencil-fill my-auto" />
                      <p class="my-auto ms-2 fw-bold">
                        Edite Profile
                      </p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 ">
            <!-- Card 2 - Bootstrap Brain Component -->
            <div class="card widget-card border-light shadow-sm h-100">
              <div class="card-body p-4">
                <h5 class="card-title widget-card-title mb-2 text-center fw-bold">
                  Application Details
                </h5>
                <hr class=" w-100 border-2 border-dark mx-auto mb-5">

                <div class="row gy-4 ">
                  <div class="col-12 d-flex flex-column mt-2">
                    <span class="mb-2 fw-bold">Current Work Situation :</span>
                    <span class="text-muted">Please select the option that best describes your current employment status. <br>
                      This information helps us understand your availability and professional context.</span>
                    
                    <div class="form-check mt-3 d-flex flex-wrap">
                      <div class="d-flex align-items-center me-4">
                        <input
                          v-model="workingSituation"
                          class="form-check-input my-auto"
                          type="radio"
                          value="Unemployed"
                        >
                        <label class="form-check-label me-4">Unemployed</label>
                      </div>

                      <div class="d-flex align-items-center me-4">
                        <input
                          v-model="workingSituation"
                          class="form-check-input my-auto"
                          type="radio"
                          value="Employed"
                        >
                        <label class="form-check-label me-4">Employed</label>
                      </div>

                      <div class="d-flex align-items-center me-4">
                        <input
                          v-model="workingSituation"
                          class="form-check-input my-auto"
                          type="radio"
                          value="Student"
                        >
                        <label class="form-check-label me-4">Student</label>
                      </div>

                      <div class="d-flex align-items-center me-4">
                        <input
                          v-model="workingSituation"
                          class="form-check-input my-auto"
                          type="radio"
                          value="Freelancer"
                        >
                        <label class="form-check-label me-4">Freelancer</label>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 d-flex flex-column mt-5">
                    <span class="mb-2 fw-bold">Remote Work Situation :</span>
                    <span class="text-muted">Are you willing to work remotely if needed? Please select one of the options below.</span>
                    
                    <div class="form-check mt-3 d-flex flex-wrap">
                      <div class="d-flex align-items-center me-4">
                        <input
                          v-model="remoteSituation"
                          class="form-check-input my-auto"
                          type="radio"
                          value="true"
                        >
                        <label class="form-check-label me-4">Yes</label>
                      </div>

                      <div class="d-flex align-items-center me-4">
                        <input
                          v-model="remoteSituation"
                          class="form-check-input my-auto"
                          type="radio"
                          value="false"
                        >
                        <label class="form-check-label me-4">No</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 d-flex flex-column">
                    <span class="mb-2 fw-bold">Cover Letter :</span>
                    <textarea
                      v-model="coverLetter"
                      class="w-100 border-ligth rounded shadow"
                      rows="5"
                    />
                  </div>
                  <div class="col-12 d-flex flex-column">
                    <span class="mb-2 fw-bold">motivation Letter :</span>
                    <textarea
                      v-model="motivation"
                      class="w-100 border-ligth rounded shadow"
                      rows="5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="pb-3 pb-md-4 pb-xl-5 bg-light">
      <div class="container">
        <div class="row gy-3 gy-md-4">
          <div class="col-12 d-flex align-item-center">
            <button
              v-if="application"
              class="mx-3 btn btn-primary btn-block fw-bold"
              @click="addApplication"
            >
              Update the application
            </button>
            <button
              v-if="application"
              class=" btn btn-danger btn-block fw-bold"
              @click="deleteApplication"
            >
              Delete the application
            </button>

            <button
              v-else
              class="mx-auto btn btn-primary btn-block fw-bold"
              @click="addApplication"
            >
              Send the application
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { toast } from "vue3-toastify";
 import axios from 'axios';

export default {
    name : 'OverView',  

    data() {
      return {
        coverLetter:"",
        application:{},
        motivation:"",
        workingSituation:"" ,
        remoteSituation:false ,
      };
    },
    mounted() {
    this.loadApplication()
    },

    methods:{
      async deleteApplication(){
        try{
          
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
              await axios.delete(`/application/${this.application._id}`)
              
                Swal.fire({
                    title: "Deleted!",
                    text: "The application has been deleted.",
                    icon: "success"
                });
                this.$router.push(`/job/${this.$route.query.JobId}`);
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error deleting the application.",
                    icon: "error"
                });
            }
        }
    });

        }catch(e)
        {
          console.error(e)
        }
      },
      async loadApplication(){
        try{
          const response = await axios.get(`/application/showOne?jobId=${this.$route.query.JobId}`)
          this.application = response.data?.application
          this.coverLetter = response.data.application?.coverLetter
          this.motivation= response.data.application?.motivation
          this.workingSituation= response.data.application?.workingSituation
          this.remoteSituation= response.data.application?.remoteSituation

        }catch(e)
        {
          console.error(e)
        }
      },
        async addApplication(){
            try {
              const JobId = this.$route.query.JobId
                const data={ 
                    coverLetter: this.coverLetter,
                    motivation: this.motivation,
                    workingSituation: this.workingSituation,
                    remoteSituation: this.remoteSituation,
                }
                await axios.post(`/application?jobId=${JobId}`,data)

            }catch (e) {
                toast(e.response.data.message , {
          "type": e.response.data.success ? "success" : "error"
        });
            }
        }

    },
 
};
</script>

<style scoped>
.form-check-input{
  width: 20px !important;
  height: 20px ;
}
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