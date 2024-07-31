<template>
  <div class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-5">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm">
            <div class="row">
              <div class="col-12">
                <div class="mb-5">
                  <h3 class="text-center">
                    Reset Password
                  </h3>
                </div>
                
                <form @submit.prevent="resetPassword()">
                  <div class="row gy-3 gy-xxl-4">
                    <div class="col-12">
                      <label
                        for="newPassword"
                        class="form-label"
                      >New Password</label>
                      <input
                        id="newPassword"
                        v-model="newPassword"
                        type="password"
                        class="form-control"
                        required
                      >
                    </div>
                    <div class="col-12">
                      <label
                        for="confirmPassword"
                        class="form-label"
                      >Confirm Password</label>
                      <input
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password"
                        class="form-control"
                        required
                      >
                    </div>
                    <div class="col-12">
                      <button
                        type="submit"
                        class="btn btn-primary"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
    import axios from 'axios';
import Swal from 'sweetalert2';
    export default {
        name : "ResetPassword",
        data() {
        return {
            newPassword: '',
      confirmPassword: ''

        }},
        computed: {
    passwordsMatch() {
      return this.newPassword === this.confirmPassword;
    }
  },
        methods: {
    async resetPassword() {
        if (this.passwordsMatch) {
      try {

        const response = await axios.post(`resetPassword/${this.$route.params.resetCode}`, {
            newPassword: this.newPassword,
        })
        Swal.fire({
          title: "check your Email",
  text: response.data.message,
  icon: "success"
        }
        );
      } catch (error) {
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: error.response.data.message ,

});
      }
    }
 else {

        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Looks like your passwords don't match.",
});
      }
}
  }
    }
    </script>