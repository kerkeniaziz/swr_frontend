<template>
  <div class="col-12 ">
    <div class="card widget-card border-light shadow-sm">
      <div class="card-body p-4">
        <div class="mb-5">
          <h3 class="text-center">
            Change Password
          </h3>
          <hr class="my-4 w-75 border-3 border-dark mx-auto">
          <p class="mt-5">
            <b>Create a strong, unique password to secure your account.</b>
          </p>
        </div>
        
        <form @submit.prevent="changePassword()">
          <div class="row gy-3 gy-xxl-4">
            <div class="col-12 d-flex ">
              <label
                for="currentPassword"
                class="form-label col-3 my-auto"
              >Current Password :</label>
              <input
                id="currentPassword"
                v-model="currentPassword"
                type="password"
                class="form-control"
                required
              >
            </div>
            <div class="col-12 d-flex ">
              <label
                for="newPassword"
                class="form-label col-3 my-auto"
              >New Password :</label>
              <input
                id="newPassword"
                v-model="newPassword"
                type="password"
                class="form-control "
                required
              >
            </div>
            <div class="col-12 d-flex ">
              <label
                for="confirmPassword"
                class="form-label col-3 my-auto  "
              >Confirm Password :</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="form-control"
                required
              >
            </div>
            <div class="col-12 d-flex align-items-center mt-5">
              <button
                type="submit"
                class="btn btn-primary mx-auto"
              >
                <i class="bi bi-pencil-fill me-2" />
                Change my password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; 
import Swal from 'sweetalert2';
export default {
    name : "ChangePassword",
    data(){
      return{
        currentPassword : "",
        newPassword : "",
        confirmPassword:""
      }
    },
      computed: {
    passwordsMatch() {
      return this.newPassword === this.confirmPassword;
    }
  },
        methods: {
    async changePassword() {
        if (this.passwordsMatch) {
      try {
        const response = await axios.put('user/changePassword', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,  
        })
        Swal.fire({
          title: "Done",
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
  text: "Looks like your new password and the Confirm Password don't match.",
});
      }
}
  }
    }

</script>

<style scoped>
form label{
  font-weight: 600;
  font-size: 17px;
}
</style>