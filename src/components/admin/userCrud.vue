<template>
  <div class="container p-3">
    <div class="row ">
      <button
        class="btn btn-primary add mx-3 "
        data-bs-toggle="modal"
        data-bs-target="#adminForm"
      >
        <i class="bi bi-person-workspace" /> Add Admin 
      </button>
      <button
        class="btn btn-primary add "
        data-bs-toggle="modal"
        data-bs-target="#candidateForm"
      >
        <i class="bi bi-people" /> Add Candidate 
      </button>
      <button
        class="btn btn-primary add ms-3 "
        data-bs-toggle="modal"
        data-bs-target="#companyForm"
      >
        <i class="bi bi-building" /> Add Company 
      </button>
      <div class="col align-self-end totalUsers">
        Total Users: {{ totalCount }}
      </div>
    </div>
    <!-- Role filter selection -->
    <div class="row mt-3">
      <div class="col-auto">
        <label
          for="roleFilter"
          class="col-form-label"
        >Filter by Role:</label>
      </div>
      <div
        class="col-auto"
        @change="fetchUsers"
      >
        <select
          v-model="selectedRole"
          class="form-select"
        >
          <option value="">
            All Users
          </option>
          <option value="admin">
            Admin
          </option>
          <option
            value="company"
          >
            Company
          </option>
          <option value="candidate">
            Candidate
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <table class="table table-hover mt-3 text-center ">
          <thead>
            <tr>  
              <th>Picture</th>

              <th>Email</th>
              <th>Role</th>
              <th>Account Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="data">
            <tr
              v-for="user in users"
              :key="user"
            >
              <th>
                <img
                  :src="'http://localhost:8000/image/' + user.profileImage"
                  class="img-fluid rounded-circle max-width-100"
                  alt="profile img"
                >
              </th>
              <th>{{ user.email }}</th>
              <th>{{ user.role }}</th>
              <th> 
                <div class="form-check form-switch d-flex align-items-center justify-content-center">
                  <input 
                    :id="'switch-' + user.id" 
                    v-model="user.isActive" 
                    class="form-check-input" 
                    type="checkbox"
                    role="switch"
                    @change="toggleStatus(user)"
                  >
                  <label
                    class="form-check-label"
                    :for="'switch-' + user.id"
                  >
                    {{ user.isActive ? 'Active' : 'Pending' }}
                  </label>
                </div>
              </th>
              <th class="w-200 ">
                <div class="mx-2 d-inline">
                  <router-link :to=" `/user/${user._id}` ">
                    <i class="bi bi-eye-fill text-success pointerIcon h5" />
                  </router-link>
                </div>
                
                <div class="mx-2 d-inline">
                  <i
                    class="bi bi-trash3-fill deleteIcon h5"
                    @click="deleteUser(user.role,user._id)"
                  />
                </div>
              </th>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
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
    <!--Modal admin Form-->
    <div
      id="adminForm"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Fill the Admin Form
            </h4>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div class="modal-body">
            <form
              id="adminForm"
              name="adminForm"
              @submit.prevent="addAdmin"
            >
              <div class="card imgholder">
                <label class="upload">
                  <input
                    id="imageInputAdmin"
                    ref="imageInputAdmin"
                    type="file"
                    name=""
                    accept=".png, .jpg, .jpeg"
                    @change="showImageAdmin"
                  >
                  <i class="bi bi-plus-circle-dotted" />
                  
                </label>
                <img
                  :src="imagePreviewAdmin "
                  alt=""
                  width="200"
                  height="200"
                  class="img"
                >
              </div>
                
              <div class="inputField">     
                <div>
                  <label for="email">Email:</label>
                  <input
                    v-model="email"
                    type="email"
                    required
                  >
                </div>
                <div>
                  <label for="password">Password:</label>
                  <input
                    v-model="password"
                    type="password"
                    required
                  >
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary submit mx-3"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--Modal condidate Form-->
    <div
      id="candidateForm"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Fill the Form
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div class="modal-body">
            <form
              id="candidateForm"
              name="candidateForm"
              @submit.prevent="addCandidate"
            >
              <div class="card imgholder">
                <label class="upload">
                  <input
                    id="imageInput"
                    ref="imageInput"
                    type="file"
                    name=""
                    accept=".png, .jpg, .jpeg"
                    @change="showImage"
                  >
                  <i class="bi bi-plus-circle-dotted" />
                </label>
                <img
                  :src="imagePreview"
                  alt=""
                  width="200"
                  height="200"
                  class="img"
                >
              </div>

              <div class="inputField">
                <div>
                  <label for="name">First Name:</label>
                  <input
                    id="name"
                    v-model="firstName"
                    type="text"
                    name=""
                    required
                  >
                </div>
                <div>
                  <label for="age">Last Name</label>
                  <input
                    id="age"
                    v-model="lastName"
                    type="text"
                    name=""
                    required
                  >
                </div>
                    
                <div>
                  <label for="email">E-mail:</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    name=""
                    required
                  >
                </div>
                    
                <div>
                  <label for="sDate">Password:</label>
                  <input
                    id="sDate"
                    v-model="password"
                    type="password"
                    name=""
                    required
                  >
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary submit mx-3"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--Modal company Form-->
    <div
      id="companyForm"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Fill the Form
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div class="modal-body">
            <form
              id="companyForm"
              name="companyForm"
              @submit.prevent="addCompany"
            >
              <div class="card imgholder">
                <label class="upload">
                  <input
                    id="imageInputCompany"
                    ref="imageInputCompany"
                    type="file"
                    name=""
                    accept=".png, .jpg, .jpeg"
                    @change="showImageCompany"
                  >
                  <i class="bi bi-plus-circle-dotted" />
                </label>
                <img
                  :src="imagePreviewCompany"
                  alt=""
                  width="200"
                  height="200"
                  class="img"
                >
              </div>

              <div class="inputField">
                <div>
                  <label for="name">Company Name:</label>
                  <input
                    id="name"
                    v-model="companyName"
                    type="text"
                    name=""
                    required
                  >
                </div>
                    
                <div>
                  <label for="email">E-mail:</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    name=""
                    required
                  >
                </div>
                    
                <div>
                  <label for="sDate">Password:</label>
                  <input
                    id="sDate"
                    v-model="password"
                    type="password"
                    name=""
                    required
                  >
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary submit mx-3"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default{
    name: 'UserCrud',
    data(){
        return{
            users : {},
            firstName:'',
            companyName:'',
            lastName:'',
            email: '',
            password: '',
            file: null, 
          profileImage: "",
          imagePreview:"http://localhost:8000/image/default.png",
          imagePreviewCompany:"http://localhost:8000/image/default.png",
          imagePreviewAdmin: "http://localhost:8000/image/default.png" ,
          formData:null,
          isActive: false,

          loading: false,
    page: 1,
    pages: 0,
    totalCount: 0,
    selectedRole:''
        }
    },
    
    mounted(){
    this.fetchUsers()

    },
    methods:{
      
      changePage(newPage) {
    if (newPage > 0 && newPage <= this.pages) {
      this.page = newPage;
      this.fetchUsers();
    }
  },
      async fetchUsers() {
      try {
        this.loading = true;
        const response = await axios.get(`user/?pageNumber=${this.page}&userrole=${this.selectedRole}`)
        // Assuming the response contains an array of users
        this.users = response.data.users.map(user => ({
          ...user,
          isActive: user.accountStatus === 'active'
        }
      ));
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.totalCount = response.data.count;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      this.loading = false;
    },
    async toggleStatus(user) {
      try {
        const newStatus = user.isActive ? 'active' : 'pending';
         await axios.put(`user/${user._id}`, {
          accountStatus: newStatus
        });
       
      } catch (error) {
        console.error('Error updating status:', error);
      }
    },
        async addAdmin(){
            const data ={
                
                email: this.email,
                password: this.password,
            }       
            const response = await axios.post('admin/', data)
            await this.handleImageUpload(response.data.user._id)
            this.fetchUsers()
            this.resetData()
        }, 
        async addCompany(){
            const data ={
              role: 'company',
              companyName: this.companyName,
                email: this.email,
                password: this.password,
            }       
            const response = await axios.post('signupCompany/', data)
            await this.handleImageUpload(response.data.company._id)
            this.fetchUsers()
            this.resetData()
        }, 
        async addCandidate(){
            const data ={
                firstName : this.firstName,
                lastName : this.lastName,
                email: this.email,
                password: this.password,
            }
           
            const response = await axios.post('signup', data)
            
            await this.handleImageUpload(response.data.candidate._id)
            this.fetchUsers()
            this.resetData()
            
        }, 
        async resetData(){
          this.firstName = '';
            this.lastName = '';
            this.companyName = '';
            this.email = '';
            this.password = '';
            this.file= null;
            this.profileImage= "";
            this.imagePreview="http://localhost:8000/image/default.png";
            this.imagePreviewCompany="http://localhost:8000/image/default.png";
            this.imagePreviewAdmin="http://localhost:8000/image/default.png";
            this.formData=null;
        },
        async showImage(){
      const fileInput = this.$refs.imageInput;
      this.file = fileInput.files[0];
      this.formData = new FormData();
        this.formData.append('ProfileImage', this.file, this.file.name);
      this.imagePreview = URL.createObjectURL(this.file);
    },
    async showImageAdmin(){
      
      const fileInput = this.$refs.imageInputAdmin;
      this.file = fileInput.files[0];
      this.formData = new FormData();
      console.error(this.file.name)
        this.formData.append('ProfileImage', this.file, this.file.name);
      this.imagePreviewAdmin = URL.createObjectURL(this.file);
    },
    async showImageCompany(){
      
      const fileInput = this.$refs.imageInputCompany;
      this.file = fileInput.files[0];
      this.formData = new FormData();
      console.error(this.file.name)
        this.formData.append('ProfileImage', this.file, this.file.name);
      this.imagePreviewCompany = URL.createObjectURL(this.file);
    },
        async handleImageUpload(id){
          if (this.formData){
        axios.put(`image/${id}`,this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',     
          },
          
        }).then(response => {
          this.userImage = 'http://localhost:8000/image/' + response.data.profileImageUrl;
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
      }
    },
    async deleteUser(role,id){

        if (role === 'admin') {
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
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
if (role === 'company') {
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
                 await axios.delete(`company/${id}`);
               await axios.delete(`user/${id}`);
                
                this.fetchUsers()
                
                Swal.fire({
                    title: "Deleted!",
                    text: "The company account has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error deleting the company account.",
                    icon: "error"
                });
            }
        }
    });
}

    }   }
}
</script>

<style >
.max-width-100{
    width: 60px;
    height: 60px;
}
.imgholder .upload{
    position: absolute;
    bottom: 0;
    left: 10;
    width: 100%;
    height: 100px;
    background: rgba(0,0,0,0.3);
    display: none;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.upload i{
    color: #fff;
    font-size: 35px;
}

.imgholder:hover .upload{
    display: flex;
}

.imgholder .upload input{
    display: none;
}

</style>