<template>
  <div class="col-12 ">
    <div class="card widget-card border-light shadow-sm">
      <div class="card-body p-4">
        <div class="mb-5">
          <h3 class="text-center">
            My resources
          </h3>
          <hr class="my-4 w-75 border-3 border-dark mx-auto">
          <p class="mt-5">
            <b>Add files and links to support and accelerate your applications</b>
          </p>
        </div>
                
        <form @submit.prevent="updateRessource()">
          <div class="row gy-3 gy-xxl-4">

            <div v-if="this.$store.state.userRole ==='candidate'">
            <div class="col-12 ">
              <h3>Files</h3>
            </div>

            <div class="d-flex mt-3">
              <label
                for="github"
                class="form-label me-5 my-auto col-1"
              >Resume :</label>
              <div class="custom-file-input-wrapper ">
                <input
                  id="cvInput"
                  ref="cvInput"
                  type="file"
                  accept=".pdf, .doc, .docx"
                  class="custom-file-input"

                  @change="handleCVUpload"
                >
                <button
                  class="btn btn-outline-secondary file-name-display"
                  :class="{ selected: fileName }"
                  @click="selectFile"
                >
                  {{ fileName || 'Choose File' }}
                </button>
              </div>
            </div>
          </div>
            <div class="col-12 ">
              <h3>Links</h3>
            </div>
            <div class="col-12 d-flex ">
              <label
                for="github"
                class="form-label me-5 my-auto"
              >Github :</label>
              <label
                for="github"
                class="form-label my-auto"
              > https://github.com/</label>
              <input
                id="github"
                v-model="socialMediaLinks.github"
                type="text"
                class="form-control w-25"
              >
            </div>

            <div class="col-12 d-flex ">
              <label
                for="linkedin"
                class="form-label me-5 my-auto"
              >linkedIn :</label>
              <label
                for="linkedin"
                class="form-label my-auto"
              > https://www.linkedin.com/</label>
              <input
                id="linkedin"
                v-model="socialMediaLinks.linkedIn"
                type="text"
                class="form-control w-25"
              >
            </div>

            <div class="col-12 d-flex ">
              <label
                for="behance"
                class="form-label me-5 my-auto"
              >Behance :</label>
              <label
                for="behance"
                class="form-label my-auto"
              > https://www.behance.net/</label>
              <input
                id="behance"
                v-model="socialMediaLinks.behance"
                type="text"
                class="form-control w-25"
              >
            </div>

            <div class="col-12 d-flex ">
              <label
                for="stackoverflow"
                class="form-label me-5 my-auto"
              >Stack overflow :</label>
              <label
                for="stackoverflow"
                class="form-label my-auto"
              > https://stackoverflow.com/users/</label>
              <input
                id="stackoverflow"
                v-model="socialMediaLinks.stackoverflow"
                type="text"
                class="form-control w-25"
              >
            </div>

            <div class="col-12 d-flex ">
              <label
                for="website"
                class="form-label me-5 my-auto"
              >WebSite :</label>
              <label
                for="website"
                class="form-label my-auto"
              > https://</label>
              <input
                id="website"
                v-model="socialMediaLinks.website"
                type="text"
                class="form-control w-25"
              >
            </div>
            <div class="col-12 d-flex align-items-center mt-5">
              <button
                type="submit"
                class="btn btn-primary mx-auto"
              >
                <i class="bi bi-clipboard-plus me-2" />
                Update my resource
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
  
    export default {
        name : "RessourcePage",
        data(){
          return{
            socialMediaLinks : {
              github :"",
            linkedIn : "",
            behance : "",
            stackoverflow : "",
            website : "",  
            },
            fileName: "",
            fileExist : false,
               
          }
        },
        mounted(){
          this.socialMediaLinks = this.$store.state.socialMediaLinks
            this.fileName = this.$store.state.profileData?.CV ||""
        },
        methods : {
          handleCVUpload(event) {
      const file = event.target.files[0];
      this.fileExist = true
      this.fileName = file ? file.name : ""; // Updates the fileName when a file is selected
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid file (PDF or Word document).');
        event.target.value = ''; // Clear the input
        this.fileExist = false
      this.fileName =  ""; 
        return;
      }
    },
    selectFile() {
      this.$refs.cvInput.click(); // Triggers the file input click event
    },
          async updateRessource(){
            try {
              const response = await axios.put('user/resource',this.socialMediaLinks)
              this.$store.commit("setUser", response.data.user)
              if (this.fileExist){
                this.handleCVUploadPost()
              }
            }catch(error){
              console.error(error);
            }
          },
          async handleCVUploadPost() {
  const fileInput = this.$refs.cvInput; // Reference the cvInput ref
  const file = fileInput.files[0]; // Get the selected file

  if (file) {
    const formData = new FormData();
    formData.append('CV', file, file.name); // Append the file to the form data

    try {
      await axios.post('/user/uploadCV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      this.fileExist = false
    } catch (error) {
      console.error('Error uploading CV:', error);
    }
  }
}
        }
        }
    
    </script>

    <style scoped>
    .custom-file-input-wrapper {
      position: relative;
      width: 35% ;
    }
    
    .custom-file-input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 2;
      top: 0;
      left: 0;
    }
    
    .file-name-display {
      width: 100%;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      cursor: pointer ;
    }
    .file-name-display.selected {
  background-color: #0d6efd;
  color: white;
  cursor: pointer;
}
    </style>