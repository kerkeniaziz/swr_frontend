<template>
  <div class="container p-3">
    <div class="row ">
      <button
        class="btn btn-primary add mx-3 "
        data-bs-toggle="modal"
        data-bs-target="#skillForm"
      >
        Add Skill <i class="bi bi-people" />
      </button>
      <div class="col align-self-end totalUsers">
        Total Skills: {{ totalCount }}
      </div>
    </div>
  
    <div class="row">
      <div class="col-12">
        <table class="table table-hover mt-3 text-center ">
          <thead>
            <tr>  
              <th>Skill Name</th>
              <th>Category</th>
              <th class="w-200">
                Actions
              </th>
            </tr>
          </thead>
  
          <tbody id="data">
            <tr
              v-for="skill in skills"
              :key="skill"
            >
              <th class="p-3">
                {{ skill.skillName }}
              </th>
              <th>{{ skill.category?.categoryName }}</th>
              <th class="w-200">
                <div class="mx-3 d-inline">
                  <i
                    class="bi bi-pencil-square text-primary pointerIcon h5"
                    data-bs-toggle="modal"
                    data-bs-target="#skillFormEdite"
                    @click="editingSkill(skill.skillName , skill.category?.categoryName)"
                  />
                </div>
                <div class="mx-2 d-inline">
                  <i
                    class="bi bi-trash3 deleteIcon h5"
                    @click="deleteSkill(skill.skillName)"
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
      
    <!--Modal skill Form-->
    <div
      id="skillForm"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Fill the Skill Form
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
              id="skillForm"
              name="skillForm"
              @submit.prevent="addSkill"
            >
              <div class="inputField">     
                <div>
                  <label for="skillName">Skill Name:</label>
                  <input
                    v-model="skillName"
                    type="text"
                    required
                  >
                </div>

                <div>
                  <label
                    for="category"
                    class="col"
                  >Category:</label>
                    
                  <select
                    v-model="selectedCategory"
                    required
                    class=" form-select categorySelect "
                  >
                    <option
                      v-for="cat in categorys"
                      :key="cat?.categoryName"
                      :value="cat?.categoryName"
                    >
                      {{ cat?.categoryName }}
                    </option>
                  </select>
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

    <!--Modal skill Edit Form-->
    <div
      id="skillFormEdite"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Edite the Skill 
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
              id="skillFormEdite"
              name="skillFormEdite"
              @submit.prevent="editSkill"
            >
              <div class="inputField">     
                <div>
                  <label for="skillName">Skill Name:</label>
                  <input
                    v-model="editingSkillName"
                    type="text"
                    required
                  >
                </div>

                <div>
                  <label
                    for="category"
                    class="col"
                  >Category:</label>
                    
                  <select
                    v-model="selectedCategory"
                    required
                    class=" form-select categorySelect"
                  >
                    <option
                      v-for="cat in categorys"
                      :key="cat.categoryName"
                      :value="cat.categoryName"
                    >
                      {{ cat.categoryName }}
                    </option>
                  </select>
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
      name: 'SkillCrud',
      data(){
          return{
              skills:{},
              categorys:{},
              category:'',
              skillName:'',
              selectedCategory:'',
              selectedSkill: '',
              editingSkillName: '',
              
              editingSkillCategory: '',
              
              loading: false,
    page: 1,
    pages: 0,
    totalCount: 0,
          }
      },
      mounted(){
        this.fetchData()
        this.fetchCategory()
      },
      methods:{
        changePage(newPage) {
    if (newPage > 0 && newPage <= this.pages) {
      this.page = newPage;
      this.fetchData()
    }
  },
        async editSkill(){
          try{
          const data ={
                  skillName: this.editingSkillName,
                  category: this.selectedCategory,
                }
                await axios.put(`skill/${this.selectedSkill}`, data)
                 
                this.fetchData()
            }catch(err)
            {console.error(err);
              Swal.fire({
  icon: "error",
  title: "Oops...",
  text: err.response.data.message,
});
            }
        },
        async editingSkill(editingSkillName, editingSkillCategory){
          this.editingSkillName = editingSkillName
          this.editingSkillCategory = editingSkillCategory

          this.selectedSkill = editingSkillName
          this.selectedCategory = editingSkillCategory
        },
        async fetchCategory(){
          try{
            const response = await axios.get('category/')
            this.categorys = response.data.categorys
          
          }catch(error){
            console.error(error);
          }
          },
          async fetchData(){
            try {
        this.loading = true;
        const response = await axios.get(`skill/?pageNumber=${this.page}`)
        // Assuming the response contains an array of users
        
        this.skills = response.data.skills
        // this.category = response.data.skills.map(skill => skill.category);

      this.page = response.data.page;
      this.pages = response.data.pages;
      this.totalCount = response.data.count;
     
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
      this.loading = false;
          },
          async addSkill(){
            try{
              const data ={
                  
                  skillName: this.skillName,
                  category: this.selectedCategory,
                }
               
                 await axios.post('skill/', data)
                  
                this.fetchData()
            }catch (error) {
              Swal.fire({
icon: "error",
title: "Oops...",
text: error.response.data.error,
});
            }
              
          }, 
         
      async deleteSkill(skillName){
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
                
                   await axios.delete(`skill/${skillName}`);
                 
                  this.fetchData()
                  
                  Swal.fire({
                      title: "Deleted!",
                      text: "The skill has been deleted successfuly.",
                      icon: "success"
                  });
              } catch (error) {
                  console.error("Error deleting Skill:", error);
                  Swal.fire({
                      title: "Error!",
                      text: error.response.data.message,
                      icon: "error"
                  });
              }
          }
      });
  
      }   }
  }
  </script>
  
  <style>
  .categorySelect{
    
    width: 75%;
    padding: 10px;
    border: none;
    outline: none;

    border-bottom: 2px solid #6c757d;
  }
  </style>