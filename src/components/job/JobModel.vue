<template>
  <!--Modal job Form-->
  <div
    id="jobForm"
    class="modal fade "
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            Fill the job Form
          </h4>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body ">
          <form
            id="jobForm"
            class="jobForm "
            name="jobForm"
            @submit.prevent="isEdit ? editJob() : addJob()"
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
                v-if="imagePreview"
                :src="imagePreview"
                alt="Image Preview"
                class="img"
              >
            </div>
            <div class="inputField mt-4">     
              <div>
                <label class="w-25">Job Title <span class="redStar">*</span></label>
                <input
                  
                  v-model="job.title"
                  type="text"
                  required
                >
              </div>
              <div>
                <label>Description <span class="redStar">*</span></label>
                    
                <textarea
                  v-model="job.description"
                  class="form-control"
                  required
                  rows="4"
                />
              </div>
              <div>
                <label>Requirement <span class="redStar">*</span></label>
                    
                <textarea
                  v-model="job.requirement"
                  class="form-control"
                  required
                  rows="4"
                />
              </div>
              <div>
                <label for="category">Category  <span class="redStar">*</span></label>
                <select
                  v-model="categoryValue"
                  required
                  class="form-select "
                >
                  <option
                    v-for="category in categorys"
                    :key="category.categoryName"
                    :value="category._id"
                  >
                    {{ category.categoryName }}
                  </option>
                </select>
              </div>
              <div>
                <label>Job Type <span class="redStar">*</span></label>
                <select
                  v-model="job.jobType"
                  class=" form-select "
                  required
                >
                  <option value="full-time">
                    Full Time
                  </option>
                  <option value="part-time">
                    Part Time
                  </option>
                  <option value="freelance">
                    Freelance
                  </option>
                  <option value="internship">
                    Internship
                  </option>
                </select>
              </div>
              <div class="d-felx flex-row justify-content-start float start">
                <label class="remote">Vacancy <span class="redStar">*</span></label><input
                  v-model="job.vacancy"
                  
                  type="number" 
                  required
                >
              </div>
              <div class=" d-felx flex-row justify-content-start">
                <span class="language">Language <span class="redStar">*</span></span>
                <div class="d-flex checkBox"> 
                  <div class="d-flex mr-5">
                    <input
                      id="inlineCheckbox1"
                      v-model="job.language"
                      type="checkbox"
                      value="English"
                    >
                    <span
                      class="checkBoxLabel"
                      for="inlineCheckbox1"
                    >English</span>
                  </div>
                  <div class="d-flex mr-5">
                    <input
                      id="inlineCheckbox2"
                      v-model="job.language"
                      type="checkbox"
                      value="French"
                    >
                    <span
                      class="checkBoxLabel"
                      for="inlineCheckbox2"
                    >French</span>
                  </div>
                  <div class="d-flex mr-5">
                    <input
                      id="inlineCheckbox3"
                      v-model="job.language"
                      type="checkbox"
                      value="Arabic"
                    >
                    <span
                      class="checkBoxLabel"
                      for="inlineCheckbox3"
                    >Arabic</span>
                  </div>
                </div>
              </div>
              <skillSelectorVue
                :skills="skills"
                :needed-skills="job.skills"
                @update:selectedSkills="handleSelectedSkills"
              />

              <div>
                <label>Experience Required <span class="redStar">*</span></label>
                <select
                  v-model="job.experienceRequired"
                  class=" form-select "
                  required
                >
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

              <div>
                <label>Contract Type <span class="redStar">*</span></label>
                <select
                  v-model="job.contractLength"
                  class=" form-select "
                  required
                >
                  <option value="1-3">
                    1-3
                  </option>
                  <option value="4-6">
                    4-6
                  </option>
                  <option value="7-12">
                    7-12
                  </option>
                  <option value="13-24">
                    13-24
                  </option>
                  <option value="25-36">
                    25-36
                  </option>
                </select>
              </div>
              <div class="d-felx flex-row justify-content-start">
                <span class="remote">Remote Option :</span>
                <div class="d-flex checkBox float-start"> 
                  <div class="d-flex  float-start">
                    <input
                      id="inlineCheckbox1"
                      v-model="job.remoteOption"
                      type="checkbox"
                      value="true" 
                    >
                  </div>
                </div>
              </div>
                  
              <div>
                <label>Adventage </label>
                <textarea
                  v-model="job.advantage"
                  class="form-control"
                  
                  rows="3"
                />
              </div>
                 
              <div class="d-felx flex-row justify-content-start float start">
                <span class="remote">Salary Range <span class="redStar">*</span></span>start: <input
                  v-model="job.salaryRangeStart"
                  class="salary"
                  type="number" 
                  required
                >ends: <input
                  v-model="job.salaryRangeEnd"
                  class="salary"
                  type="number"
                  required
                >
              </div>
              <span
                v-if="!formIsValid"
                class="text-danger"
              >Please fill out the form correctly.</span> <br>
              <button
                type="button"
                class="btn btn-secondary"
              
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
              <button
                :disabled="!formIsValid"
                type="submit"
                class="btn btn-primary submit mx-3"
               data-bs-dismiss="modal"
                @click="emitFetchData"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

import skillSelectorVue from '../skill/skillSelector.vue';
//   import Swal from 'sweetalert2';
  
  export default{
      name: 'JobModel', 
      components:{
        skillSelectorVue
      },
      props:{
        selectedJob: {
      type: Object,
      default: () => ({}) // Default value as an empty object
    },
    isEdit: Boolean,

      },
      emits: ['fetch-data'],
      data(){
          return{
                job:{
                    title :"",
                    description:"",
                    jobType:"",
                    skills:{},
                    language:[],
                    salaryRangeStart:"",
                    salaryRangeEnd:"",
                    advantage:"",
                    remoteOption:false,
                    experienceRequired:"",
                    category:"",
                    contractLength:"",
                },    
                skills:[],
                categorys:[],
                file: null, 
                jobCover:"",
          imagePreview:"",
          formData:null,
          formIsValid: false
         
          }
      },
  computed: {
    categoryValue: {
      get() {
        return this.isEdit ? this.job.category._id : this.job.category;
      },
      set(value) {
        if (this.isEdit) {
          this.job.category._id = value;
        } else {
          this.job.category = value;
        }
      },
    },
  },
      watch: {
        'job.title': 'validateForm',
    'job.description': 'validateForm',
    'job.category': 'validateForm',
    'job.jobType': 'validateForm',
    'job.language': 'validateForm',
    'job.experienceRequired': 'validateForm',
    'job.contractLength': 'validateForm',
    'job.salaryRangeStart': 'validateForm',
    'job.salaryRangeEnd': 'validateForm',
   
    selectedJob: {
      immediate: true,
      handler(newJob) {
        if (newJob) {
          this.job = { ...newJob };
        }
      },
    },
  },
      mounted(){
        this.fetchData()
      },
      methods : {
        async handleImageUpload(id){
        axios.put(`image/cover/${id}`,this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',     
          },
          
        }).then(response => {
          this.jobCover = this.$store.imageUrl + response.data.coverUrl;
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    },
        async showImage(){
      const fileInput = this.$refs.imageInput;
      this.file = fileInput.files[0];
      this.formData = new FormData();
        this.formData.append('cover', this.file, this.file.name);
      this.imagePreview = URL.createObjectURL(this.file);
    },
        handleSelectedSkills(skills) {
    this.job.skills = skills;

  },
        async fetchData(){
          try{
           
            await this.fetchCategory()
          await this.fetchSkill()
          }catch(error){
          console.error(error)
          }
          
        },
          async fetchCategory(){
          try{
            const response = await axios.get('category/')
            this.categorys = response.data.categorys
          }catch(error){
            console.error(error);
          }
          },
          async fetchSkill(){
          try{
            const response = await axios.get('skill/')
            this.skills = response.data.skills.map(skill => skill.skillName);
          }catch(error){
            console.error(error);
          }
          }, 
          emitFetchData() {
      this.$emit('fetch-data', 'true'); // You can emit any value you need here
       
    },
          async addJob() {

            try{
             const response =await axios.post('job/', this.job)
              if (this.imagePreview)
              {await this.handleImageUpload(response.data.data._id)}

          }catch(error){
            console.error(error);
          }
          },
          async editJob() {
      try {
        await axios.put(`job/${this.job._id}`, this.job);
        if (this.imagePreview)
              {await this.handleImageUpload(this.job._id)}
      } catch (error) {
        console.error(error);
      }
    },
    validateForm() {
      const {
        title,
        description,
        category,
        jobType,
        language,
        experienceRequired,
        contractLength,
        salaryRangeStart,
        salaryRangeEnd
      } = this.job;
      // Check if all required fields are filled
      this.formIsValid = !!(
        title &&
        description &&
        category &&
        jobType &&
        language.length &&
        experienceRequired &&
        contractLength &&
        salaryRangeStart &&
        salaryRangeEnd
      );
    },
      
    }
  }
</script>

<style scoped>
.card.imgholder {
    position: relative; 
    width: 100%;
    min-height: 220px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
  }

  .card.imgholder label.upload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    color: #007bff;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }

  .card.imgholder label.upload:hover {
    color: #0056b3;
  }

  .card.imgholder input[type="file"] {
    display: none;
  }

  .card.imgholder img.img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
.form-check-input {
margin-right: 15px;
  width: 2.5em !important;
  height: 1.5em;
  border-radius: 1em;
  cursor: pointer;
}
textarea.form-control:focus {
  outline: none;
  box-shadow: none;

}

input.form-control:focus {
  outline: none ;
  box-shadow: none ;
  border: none ;
}
.form-select:focus {
  outline: none;
  box-shadow: none;

}
.checkBox div input {
    margin-right: 5px !important;
}
.checkBox div span {
    margin-right: 20px ;
}
.checkBox label {
    width: 18% !important;
}
 .jobForm{

    display: block !important;
}
.jobForm label{
    width: 30% !important;

}
.jobForm input, select, textarea {
 width: 100% !important;
 margin-right:25px !important;
} 
.salary{
 max-width: 100px!important;
}

.language{
  width: 18%!important;
  font-size: 20px;
  font-weight: 500;
  margin-right: 30px;
}
.remote{
  width: 24%!important;
  font-size: 20px;
  font-weight: 500;
  margin-right: 0px;
}

</style>