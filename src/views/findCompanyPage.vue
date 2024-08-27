<template>
  <section class="bg-light mt-5">
    <div class="container ">
      <h2 class="mb-5">
        Find the <b class="text-primary">Company</b> you looking for
      </h2>
      <div class="row g-2 p-2 my-3 mb-5 bg-white shadow-sm rounded">
        <div class="col-md-10 my-auto">
          <div class="row g-2">
            <div class="col-md-6">
              <input
                v-model="keyword"
                type="text"
                class="form-control border-0 bg-light shadow-sm"
                placeholder="Enter a company name"
              >
            </div>
            <div class="col-md-6">
              <input
                v-model="location"
                type="text"
                class="form-control border-0 bg-light shadow-sm"
                placeholder="Enter a location"
              >
            </div>
          </div>
        </div>
        <div class="col-md-2 my-auto">
          <button
            class="btn btn-primary border-0 w-100"
            @click="fetchCompanies"
          >
            <b> Search for companies</b>
          </button>
        </div>
      </div>
      <div class="row gy-4 gy-lg-0">
        <div class="col-12 col-lg-8 col-xl-12">
          <div class="container-xxl pb-5 ">
            <div class="container">
              <div
                class="tab-class text-center wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div class="tab-content">
                  <div
                
                    class="row"
                  >
                    <div
                      v-for="(company, index) in companies"
                      :key="index"
                      class="col-md-4 mb-4"
                    >
                      <div
                        v-show="company.userId.accountStatus"
                        class="job-item p-3 h-100 mb-3"
                      >
                        <div class="d-flex">
                          <img
                            class="flex-shrink-0 img-fluid border rounded align-self-start"
                            :src="$store.state.imageUrl + company.userId.profileImage"
                            alt=""
                            style="width: 50px; height: 50px;"
                          >
                          <h5 class="mb-1 text-start ps-3 text-truncate jobtitle-truncate">
                            {{ company.companyName }}
                          </h5>
                        </div>
                        <div class="align-bottom text-start ">
                          <br>
                          <small class="text-truncate d-block my-1"><i class="bi bi-laptop-fill text-primary me-1" />{{ company?.industry || 'none' }}</small>
                          <small class="text-truncate d-block my-1"><i class="bi bi-building-fill text-primary me-1" />{{ company?.companySize || 'none' }}</small>
                          <small class="text-truncate d-block my-1"><i class="bi bi-geo-alt-fill text-primary me-1" />{{ company?.location?.city  }}, {{ company?.location?.state }}</small>
                        </div>
                    
                        <router-link
                          :to="'/user/' + company._id"
                          class="btn btn-primary w-100 align-bottom"
                        >
                          View Company
                        </router-link>
                      </div>
                    </div>
                  </div>
  
                  <div
                
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
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
import axios from 'axios';
  export default {
    name: 'FindCompanyPage',
    data() {
      return {
        companies:{},
        keyword:"", 
        location:"",
        count:9,
        page: 1,
        pages: 0,
      }
    },
    mounted() {
        this.fetchCompanies();
    },
    methods: {
        async fetchCompanies(){
            try{
                const response = await axios.get(`/company?pageSize=${this.count}&pageNumber=${this.page}&keyword=${this.keyword}&location=${this.location}`)
                this.companies = response.data.company.map(company => ({
          ...company,
          location: company.userId.location
        }
    )) 
    this.count = response.data.count
    this.pages = response.data.pages
    this.page = response.data.page

            }
            catch(error){
                console.error(error);
            }
        },      
      changePage(newPage) {
      if (newPage > 0 && newPage <= this.pages) {
        this.page = newPage;
        this.fetchCompanies();
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
  