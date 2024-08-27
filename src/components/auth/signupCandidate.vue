<template>
  <!-- Registration 13 - Bootstrap Brain Component -->
  <section class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-5">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <div class="text-center mb-3">
                <router-link to="/">
                  <img
                    src="../../assets/img/1.png"
                    alt="BootstrapBrain Logo"
                    width="175"
                  >
                </router-link>
              </div>
              <h2 class="fs-6 fw-normal text-center text-secondary mb-4">
                Enter your details to register
              </h2>
              <div class="mb-4 text-center">
                <span
                  v-if="errorAlert"
                  class="redStar h6 "
                >{{ alertMessage }}</span>
                <span
                  v-else-if="!passwordsMatch"
                  class="redStar h6 "
                >the password does not match </span>
              </div>
              
              <form @submit.prevent="handelSubmit">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        v-model="firstName"
                        type="text"
                        class="form-control"
                        placeholder="First Name"
                        required
                      >
                      <label
                        for="firstName"
                        class="form-label"
                      >First Name</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        v-model="lastName"
                        type="text"
                        class="form-control"
                        placeholder="Last Name"
                        required
                      >
                      <label
                        for="lastName"
                        class="form-label"
                      >Last Name</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        v-model="email"
                        type="email"
                        class="form-control"
                        placeholder="name@example.com"
                        required
                      >
                      <label
                        for="email"
                        class="form-label"
                      >Email</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="form-control"
                        name="password"
                        value=""
                        placeholder="Password"
                        required
                      >
                      <label
                        for="password"
                        class="form-label"
                      >Password</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating mb-3">
                      <input
                        id="password"
                        v-model="confirmPassword"
                        type="password"
                        class="form-control"
                        name="password"
                        value=""
                        placeholder="Password"
                        required
                      >
                      <label
                        for="password"
                        class="form-label"
                      >Confirm Password</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-check">
                      <input
                        id="iAgree"
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        name="iAgree"
                        required
                      >
                      <label
                        class="form-check-label text-secondary"
                        for="iAgree"
                      >
                        I agree to the <router-link
                          to="terms_and_conditions"
                          class="link-primary text-decoration-none"
                        >terms and conditions</router-link>
                      </label>
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <div class="d-grid my-3">
                      <button
                        class="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="m-0 text-secondary text-center">
                      Already have an account? <router-link
                        to="/login"
                        class="link-primary text-decoration-none"
                      >
                        Sign in
                      </router-link>
                    </p>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <p class="m-0 mt-2 text-secondary text-center">
                        An Employer? <router-link
                          to="/signupComapny"
                          class="link-primary text-decoration-none"
                        >
                          Sign Up
                        </router-link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
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
    name : "SignupCandidate",
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            iAgree: true,
            role: "candidate",
            alertMessage : '',
            errorAlert : false
        }
    },
    computed: {
    passwordsMatch() {
      return this.password === this.confirmPassword;
    }
  },
    methods: {
        async handelSubmit(){
          if (this.passwordsMatch){
            try {
            const data ={
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                role: this.role,
            }
            this.errorAlert = false
             await axios.post('signup', data)
            this.$router.push('/login');
            
          }
          catch (error)
          {
            this.alertMessage = error.response.data.error
            this.errorAlert = true
          }
          } 
          
        },
    
    }
}

</script>

<style>

</style>