<template>
  <div class="container p-3">
    <div class="row ">
      <button
        class="btn btn-primary add mx-3 "
        data-bs-toggle="modal"
        data-bs-target="#categoryForm"
      >
        Add Category <i class="bi bi-people" />
      </button>
      <div class="col align-self-end totalUsers">
        Total Categories: {{ totalCount }}
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <table class="table table-hover mt-3 text-center">
          <thead>
            <tr>  
              <th>Icon</th>
              <th>Name</th>
              
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="data">
            <tr
              v-for="category in categorys"
              :key="category"
            >
              <th>
                <i
                  :class="category.icon"
                  class="h4"
                />
              </th>
              <th class="p-3">
                {{ category.categoryName }}
              </th>
              <th class=" w-200">
                <div class="mx-3 d-inline">
                  <i
                    class="bi bi-pencil-square text-primary pointerIcon h5"
                    data-bs-toggle="modal"
                    data-bs-target="#categoryFormEdite"
                    @click="editingCategory(category.categoryName, category.icon)"
                  />
                </div>
                <div class="mx-2 d-inline">
                  <i
                    class="bi bi-trash3 deleteIcon h5"
                    @click="deleteCategory(category._id)"
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
    
    <!--Modal category Form-->
    <div
      id="categoryForm"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Fill the Category Form
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
              id="categoryForm"
              name="categoryForm"
              @submit.prevent="addCategory"
            >
              <div class="inputField ">     
                <div>
                  <label for="categoryName">Category Name:</label>
                  <input
                    v-model="categoryName"
                    type="text"
                    required
                  >
                </div>
                <div>
                  <label for="categoryName">Bottstrap Icon Class:</label>
                  <input
                    v-model="icon"
                    type="text"
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

    <!--Modal skill Edit Form-->
    <div
      id="categoryFormEdite"
      class="modal fade"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Edite the Category 
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
              id="categoryFormEdite"
              name="categoryFormEdite"
              @submit.prevent="editCategory"
            >
              <div class="inputField">     
                <div>
                  <label for="categoryName">Category Name:</label>
                  <input
                    v-model="editedCategory"
                    type="text"
                    required
                  >
                </div>
                <div>
                  <label for="categoryName">Bottstrap Icon Class:</label>
                  <input
                    v-model="editedicon"
                    type="text"
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
    name: 'CategoryCrud',
    
    data(){
        return{
            categorys:{},
            categoryName:'', 
            icon:'',
            editedicon:'',
            editedCategory:'' ,
            loading: false,
    page: 1,
    pages: 0,
    totalCount: 0,     
        }
    },
    mounted(){

    this.fetchData()

    },
    methods:{
      changePage(newPage) {
    if (newPage > 0 && newPage <= this.pages) {
      this.page = newPage;
      this.fetchData()
    }
  },
      async editCategory(){
        try{
        const data ={
                categoryName: this.editedCategory,
                icon : this.editedicon
              }
               await axios.put(`category/${this.categoryName}`, data)
              this.fetchData()
          }catch(err)
          {
            Swal.fire({
icon: "error",
title: "Oops...",
text: err.response.data.message,
});
          }
      },
      async editingCategory(categoryName,icon){
        this.categoryName = categoryName
        this.editedCategory = categoryName
        this.icon = icon
        this.editedicon = icon
      },
        async fetchData(){
          try{
            this.loading = true;
            const response = await axios.get(`category/?pageNumber=${this.page}&pageSize=10`)          
            this.categorys = response.data.categorys

            this.page = response.data.page;
      this.pages = response.data.pages;
      this.totalCount = response.data.count;
          }catch(error)
          {
            console.error('Error fetching category:', error);
          }
            
        },
        async addCategory(){
          try{
            const data ={
              categoryName: this.categoryName,
              icon : this.icon
            }
           await axios.post('category/', data)  
            
              this.fetchData()
          }catch(error)
          {
            Swal.fire({
icon: "error",
title: "Oops...",
text: error.response.data.error,
});
          }
           
        }, 
       
    async deleteCategory(id){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#d1cfc8",
        confirmButtonText: "Yes, delete it!",
        
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                 await axios.delete(`category/${id}`);
                this.fetchData()
                Swal.fire({
                    title: "Deleted!",
                    text: "The Category has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                console.error("Error deleting Category:", error.response.data.message);
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

<style scoped>
.inputField label {
  width: 35% !important;
}

</style>