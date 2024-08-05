<template>
  <div class="col-12 ">
    <div class="card widget-card border-light shadow-sm">
      <div class="card-body p-4">
        <div class="mb-5">
          <h3 class="text-center">
            Edit Profile
          </h3>
          <hr class="my-4 w-75 border-3 border-dark mx-auto">
        </div>
        <form
          class="row gy-3 gy-xxl-4"
          @submit.prevent="updateProfile()"
        >
          <div class="col-12 ">
            <div class="row gy-2 ">
              <label class="col-12 form-label m-0 text-center">Profile Image</label>
              <div
                v-if="profileImage"
                class="col-12 "
              >
                <img
                  :src="profileImage"
                  class="img-fluid rounded-circle mw-250 mx-auto d-block"
                  alt="profileimage"
                >
              </div>
              <div v-else>
                No Profile Image is selected
              </div>
              <div class="d-flex justify-content-center mt-3 ">
                <label
                  for="imageInput"
                  class="d-inline-block bg-primary link-light lh-1 p-2 rounded  mx-auto"
                >
                  <i class="bi bi-upload" />
                </label>
                <input
                  id="imageInput"
                  ref="imageInput"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  @change="handleImageUpload"
                >
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputFirstName"
              class="form-label"
            >First Name:</label>
            <input
              id="inputFirstName"
              v-model="ProfileData.firstName"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputLastName"
              class="form-label"
            >Last Name:</label>
            <input
              id="inputLastName"
              v-model="ProfileData.lastName"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-12">
            <label
              for="inputAbout"
              class="form-label"
            >Bio</label>
            <textarea
              id="inputAbout"
              v-model="ProfileData.about"
              class="form-control"
            />
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputJob"
              class="form-label"
            >Profile Title</label>
            <input
              id="inputJob"
              v-model="ProfileData.jobTitle"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputcurrentPosition"
              class="form-label"
            >Current Position</label>
            <input
              id="inputcurrentPosition"
              v-model="ProfileData.currentPosition"
              type="text"
              class="form-control"
            >
          </div>
          
          <div class="col-12 col-md-6">
            <label
              for="inputexperinece"
              class="form-label"
            >Experience</label>
            <select
              id="inputexperinece"
              v-model="ProfileData.experience"
              class="form-control"
            >
              <option
                value=""
                disabled
              >
                Select Experience
              </option>
              <option value="0-1">
                0-1
              </option>
              <option value="1-3">
                1-3
              </option>
              <option value="3-5">
                3-5
              </option>
              <option value="5-10">
                5-10
              </option>
              <option value="+10">
                +10
              </option>
            </select>
          </div>
          <div class="col-12 col-md-6">
            <skillSelector
              :skills="skills"
              :dnone="true"
              :cclass="'w-100'"
              :needed-skills="ProfileData.skills"
              @update:selectedSkills="handleSelectedSkills"
            />
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputdateofbirth"
              class="form-label"
            >Date of Birth</label>
            <input
              id="inputdateofbirth"
              v-model="ProfileData.dateOfBirth"
              type="date"
              class="form-control"
              :max="maxDate"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputgender"
              class="form-label"
            >Gender</label>
            <select
              id="inputgender"
              v-model="ProfileData.gender"
              class="form-control"
            >
              <option
                value=""
                disabled
              >
                Select Gender
              </option>
              <option value="man">
                Man
              </option>
              <option value="woman">
                Woman
              </option>
              <option value="none">
                None
              </option>
            </select>
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputPhone"
              class="form-label"
            >Phone</label>
            <input
              id="inputPhone"
              v-model="userData.phone"
              type="tel"
              class="form-control"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputAddress"
              class="form-label"
            >Address</label>
            <input
              id="inputAddress"
              v-model="location.address"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputAddress"
              class="form-label"
            >City</label>
            <input
              id="inputAddress"
              v-model="location.city"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputAddress"
              class="form-label"
            >State</label>
            <input
              id="inputAddress"
              v-model="location.state"
              type="text"
              class="form-control"
            >
          </div>
          <div class="col-12 col-md-6">
            <label
              for="inputAddress"
              class="form-label"
            >Postal Code</label>
            <input
              id="inputAddress"
              v-model="location.postalCode"
              type="text"
              class="form-control"
            >
          </div>
        
          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import skillSelector from '../skill/skillSelector.vue';
import axios from 'axios'; 

export default{
    name :"ProfileEdite",
    components: {
        skillSelector,
    },

    data(){
        return{
          ProfileData: {},
          userData:{},
          location:{},
          file: null,
          profileImage: "",
          skills: [],
          maxDate: this.calculateMaxDate()

        }
    },
                                              
      mounted(){
        this.fetchSkill(),
        this.ProfileData= this.$store.state?.profileData,
        this.userData=this.$store.state?.userData,
        this.location=this.$store.state?.location,
        this.profileImage= this.$store.state?.profileImage

    },

    methods: {
      calculateMaxDate() {
        const today = new Date();
        const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
        return maxDate.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
      },
       handleSelectedSkills(skills) {
    this.ProfileData.skills = skills;

  },
  async fetchSkill(){
          try{
            const response = await axios.get('skill/')
            this.skills = response.data.skills.map(skill => skill.skillName)
          }catch(error){
            console.error(error);
          }
          },
    async updateProfile() {
      if(this.userData.role ==="admin"){
        // eslint-disable-next-line
        console.log('admin')
      }else if (this.userData.role ==="candidate"){
      try {

        const candidateUpdate = {
          firstName: this.ProfileData.firstName,
          lastName: this.ProfileData.lastName,
          jobTitle: this.ProfileData.jobTitle,
          about: this.ProfileData.about,
          skills : this.ProfileData.skills,
          currentPosition : this.ProfileData.currentPosition,
          experience : this.ProfileData.experience,
          gender : this.ProfileData.gender,
          dateOfBirth : this.ProfileData.dateOfBirth,
          
          }
          const userUpdate = {
            phone: this.userData.phone,
          }
        const response = await axios.put(`candidate/${this.userData._id}`, {
          candidateData : candidateUpdate,
          userData : userUpdate,
          location : this.location
          
        })
         this.$store.commit("setUser", response.data.user) 
           this.$store.commit("setProfile", response.data.candidate)

      } catch (error) {
        console.error('Update Profile error:', error)
      }
    }
    else {
      // eslint-disable-next-line
      console.log('company')
    }
    },
    async handleImageUpload(){
      const fileInput = this.$refs.imageInput;
      this.file = fileInput.files[0];

      const formData = new FormData();
        formData.append('ProfileImage', this.file, this.file.name);

        axios.put('/image/uploadProfileImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',     
          }
        }).then(response => {
          this.profileImage = 'http://localhost:8000/image/' + response.data.profileImageUrl;
          this.$store.commit("setProfileImage", this.profileImage)
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });

    },
  }
    
  }

</script>

<style scoped>
.mw-250{
max-width: 250px;
}
input:focus, textarea:focus, select:focus {
  outline: none;

    box-shadow: 0 0 5px rgba(131, 131, 131, 0.5);
  }
   
  #inputdateofbirth {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s, box-shadow 0.3s;
  } 
</style>