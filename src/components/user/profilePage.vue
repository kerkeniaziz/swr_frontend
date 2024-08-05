<template>
  <section class="bg-light ">
    <div class="container">
      <div class="row gy-4 gy-lg-0">
        <div class="col-12 col-lg-4 col-xl-3">
          <div class="row gy-4">
            <div class="col-12">
              <div class="card widget-card border-light shadow-sm">
                <div class="card-header text-bg-primary">
                  Welcome, {{ ProfileData.firstName }} 
                </div>
                <div class="card-body">
                  <div class="text-center mb-3">
                    <img
                      :src="profileImage"
                      class="img-fluid rounded-circle max-width-150"
                      alt="profile img"
                    >
                  </div>
                  <h5 class="text-center mb-1">
                    {{ ProfileData.firstName }} {{ ProfileData.lastName }}
                  </h5>
                  <p class="text-center text-secondary mb-4">
                    {{ ProfileData.jobTitle }}
                  </p>
                </div>
              </div>
            </div> 
            <div class="col-12">
              <div class="card widget-card border-light shadow-sm">
                <div class="card-header text-bg-primary">
                  Social Accounts
                </div>
                <div class="card-body">
                  <a
                    v-if="socialLinks?.github"    
                    :href="`https://github.com/${socialLinks?.github}`" 
                    target="_blank" 
                    class="d-inline-block bg-dark link-light lh-1 p-2 rounded mx-2"
                  >
                    <i class="bi bi-github fs-5" />
                  </a>
                  <div 
                    v-else 
                    class="d-inline-block bg-secondary text-muted lh-1 p-2 rounded mx-2" 
                    style="pointer-events: none;"
                  >
                    <i class="bi bi-github fs-5" />
                  </div>
  
                  <a 
                    v-if="socialLinks?.linkedIn" 
                    :href="`https://www.linkedin.com/in/${socialLinks?.linkedIn}`" 
                    target="_blank" 
                    class="d-inline-block bg-dark link-light lh-1 p-2 rounded mx-2"
                  >
                    <i class="bi bi-linkedin fs-5" />
                  </a>
                  <div 
                    v-else 
                    class="d-inline-block bg-secondary text-muted lh-1 p-2 rounded mx-2" 
                    style="pointer-events: none;"
                  >
                    <i class="bi bi-linkedin fs-5" />
                  </div>
  
                  <a
                    v-if="socialLinks?.behance" 
                    :href="`https://www.behance.net/${socialLinks?.behance}`" 
                    target="_blank" 
                    class="d-inline-block bg-dark link-light lh-1 p-2 rounded mx-2"
                  >
                    <i class="bi bi-behance fs-5" />
                  </a>
                  <div 
                    v-else 
                    class="d-inline-block bg-secondary text-muted lh-1 p-2 rounded mx-2" 
                    style="pointer-events: none;"
                  >
                    <i class="bi bi-behance fs-5" />
                  </div>
  
                  <a
                    v-if="socialLinks?.stackoverflow" 
                    :href="`https://stackoverflow.com/users/${socialLinks?.stackoverflow}`" 
                    target="_blank" 
                    class="d-inline-block bg-dark link-light lh-1 p-2 rounded mx-2"
                  >
                    <i class="bi bi-stack-overflow fs-5" />
                  </a>
                  <div 
                    v-else 
                    class="d-inline-block bg-secondary text-muted lh-1 p-2 rounded mx-2" 
                    style="pointer-events: none;"
                  >
                    <i class="bi bi-stack-overflow fs-5" />
                  </div>
  
                  <a
                    v-if="socialLinks?.website" 
                    :href="`https://${socialLinks?.website}`" 
                    target="_blank" 
                    class="d-inline-block bg-dark link-light lh-1 p-2 rounded mx-2"
                  >
                    <i class="bi bi-browser-chrome fs-5" />
                  </a>
                  <div 
                    v-else 
                    class="d-inline-block bg-secondary text-muted lh-1 p-2 rounded mx-2" 
                    style="pointer-events: none;"
                  >
                    <i class="bi bi-browser-chrome fs-5" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card widget-card border-light shadow-sm">
                <div class="card-header text-bg-primary">
                  Skills
                </div>
                <div class="card-body">
                  <span
                    v-for="skill in skills"
                    :key="skill"
                    class="badge text-bg-primary mx-1"
                  >{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-8 col-xl-9">
          <div class="card widget-card border-light shadow-sm">
            <div class="card-body p-4">
              <div
                id="profileTabContent"
                class="tab-content pt-4"
              >
                <div
                  id="overview-tab-pane"
                  class="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                  tabindex="0"
                >
                  <p class="fs-6 mb-3 fw-bold">
                    {{ ProfileData.about }}
                  </p>
                  <h5 class="mb-3">
                    Profile
                  </h5>
                  <div class="row g-0">
                    <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                      <div class="p-2">
                        First Name
                      </div>
                    </div>
                    <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                      <div class="p-2">
                        {{ ProfileData.firstName }}
                      </div>
                    </div>
                    <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                      <div class="p-2">
                        Last Name
                      </div>
                    </div>
                    <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                      <div class="p-2">
                        {{ ProfileData.lastName }}
                      </div>
                    </div>
                   
                    <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                      <div class="p-2">
                        Address
                      </div>
                    </div>
                    <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                      <div class="p-2">
                        {{ location.city }}, {{ location.state }}
                      </div>
                    </div>
                    <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                      <div class="p-2">
                        Job
                      </div>
                    </div>
                    <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                      <div class="p-2">
                        {{ ProfileData.jobTitle }}
                      </div>
                    </div>
  
                    <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                      <div class="p-2">
                        Phone
                      </div>
                    </div>
                    <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                      <div class="p-2">
                        {{ userId?.phone }}
                      </div>
                    </div>
                    <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                      <div class="p-2">
                        Email
                      </div>
                    </div>
                    <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                      <div class="p-2">
                        {{ userId.email }}
                      </div>
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
</template>
  
  <script>
import axios from 'axios';
  
  export default{
      name :"ProfilePage",
  
      data(){
          return{
            ProfileData: {},
            userId:{},
            location:{},
        profileImage: '',
        skills : {},
        socialLinks: {},
          }
      },
       async mounted(){
        this.getProfile()
      },
      methods:{
        async getProfile(){
            const response = await axios.get(`candidate/${this.$route.query.userId}`)
            this.profileImage= this.$store.state.imageUrl + response.data.candidate.userId.profileImage,
            this.ProfileData = response.data.candidate;
        this.location = response.data.candidate.userId.location;
        this.userId = response.data.candidate.userId;
        this.skills = response.data.candidate.skills; 
        this.socialLinks = response.data.candidate.userId.socialMediaLinks
        }
      }
  }
  
  </script>
  
  <style >
  .max-width-150 {
    max-width: 150px !important;
  }
  </style>