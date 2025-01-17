<template>
  <div class="col-12" v-if="this.$store.state.userRole !=='admin'" >
    <div class="card widget-card border-light shadow-sm">
      <div class="card-body p-4">
        <div class="mb-4">
          <h3 class="text-center">
            Account Settings
          </h3>
          <hr class="my-4 w-75 border-3 border-dark mx-auto">
          <p class="mt-5">
            <b>Do not hesitate to contact our customer service if you need help.</b>
          </p>
        </div>
        <div class="col-12 d-flex mb-5 ">
          <label
            for="currentPassword"
            class="form-label col-3 my-auto"
          >Enter your Password :</label>
          <input
            id="currentPassword"
            v-model="currentPassword"
            type="password"
            class="form-control"
            required
          >
        </div>
              
        <div class="align-items-center d-flex justify-content-center mx-auto">
          <!-- <input type="radio" class="btn-check" name="language" id="english"  > -->
          <button
            class="btn btn-secondary me-4"
            @click="disableAccount"
          >
            Disable
          </button>

          <!-- <input type="radio" class="btn-check" name="language" id="french" > -->
          <button
            class="btn btn-danger"
            @click="deleteAccount"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import Swal from'sweetalert2';
  export default {
      name : "AccountSetting",
      data(){
        return{
            currentPassword:''
          
        }
      },
      mounted (){
      },
      methods : {
        async verifyPassword(){
            try {
                const response = await axios.post(`user/verifyPassword/`, {
                password: this.currentPassword
});
                if (response.data.verified) {
                    return true;
                } else {
                    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Your password is incorrect!",
});
                    return false;
                }

} catch (error) {
console.error('Error Disabling the Account:', error);
}
        },
       async disableAccount(){
        if (this.verifyPassword())
       {
        
            try {
                
await axios.put(`user/${this.$store.state.userData._id}`, {
 accountStatus: 'pending'
});

} catch (error) {
console.error('Error Disabling the Account:', error);
}
}},
        async deleteAccount(){
            if (this.verifyPassword()) {
            const role = this.$store.state.userRole;
            const id = this.$store.state.userData._id;
if (role === 'admin') {
Swal.fire({
title: "Are you sure?",
text: "You won't be able to revert this!",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#d33",
cancelButtonColor: "#6c757d",
confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
if (result.isConfirmed) {
    try {
         await axios.delete(`admin/${id}`);
        await axios.delete(`user/${id}`);
       
        this.fetchUsers()
        
        Swal.fire({
            title: "Deleted!",
            text: "The admin account has been deleted.",
            icon: "success"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
            title: "Error!",
            text: "There was an error deleting the admin account.",
            icon: "error"
        });
    }
}
});
}
if (role === 'candidate') {
Swal.fire({
title: "Are you sure?",
text: "You won't be able to revert this!",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#d33",
cancelButtonColor: "#6c757d",
confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
if (result.isConfirmed) {
    try {
         await axios.delete(`candidate/${id}`);
       await axios.delete(`user/${id}`);
        
        this.fetchUsers()
        
        Swal.fire({
            title: "Deleted!",
            text: "The candidate account has been deleted.",
            icon: "success"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
            title: "Error!",
            text: "There was an error deleting the candidate account.",
            icon: "error"
        });
    }
}
});
}

}
      }
    }
      }
  
  </script>