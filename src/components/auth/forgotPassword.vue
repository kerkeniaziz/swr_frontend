<template>
  <!-- Password Reset 13 - Bootstrap Brain Component -->
  <section class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-5">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <div class="text-center mb-3">
                <a href="/">
                  <img
                    src="../../assets/img/1.png"
                    alt="BootstrapBrain Logo"
                    width="175"
                  >
                </a>
              </div>
              <h2 class="fs-6 fw-normal text-center text-secondary mb-4">
                Provide the email address associated with your account to recover your password.
              </h2>
              <form @submit.prevent="forgotPassword()">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="form-floating">
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
                    <div class="d-grid my-3">
                      <button
                        class="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-flex gap-2 justify-content-between">
                      <a
                        href="/login"
                        class="link-primary text-decoration-none"
                      >Log In</a>
                      <a
                        href="/signup"
                        class="link-primary text-decoration-none"
                      >Register</a>
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
import Swal from 'sweetalert2';
export default{
    name : "ForgotPassword",
    data() {
        return {
          email: '',

        }},
        methods: {
    async forgotPassword() {
      try {

        const response = await axios.post('forgotPassword', {
          email: this.email,
          host : window.location.host
        })
        Swal.fire({
          title: "check your Email",
  text: response.data.message,
  icon: "success"
        }
        );
      } catch (error) {
        //console.error('Login error5555:', error.response.data.message,"   :")
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: error.response.data.message,
});
      }
    }
  }
}

</script>

<style>

</style>