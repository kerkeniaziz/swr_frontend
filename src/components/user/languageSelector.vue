<template>
  <div class="col-12 ">
    <div class="card widget-card border-light shadow-sm">
      <div class="card-body p-4">
        <div class="mb-5">
          <h3 class="text-center">
            Change Language
          </h3>
          <hr class="my-4 w-75 border-3 border-dark mx-auto">
          <p class="mt-5">
            <b>Choose the language you like to use our site with</b>
          </p>
        </div>
              
        <div
          class="btn-group d-flex align-items-center mt-5 mx-5 mb-2"
          role="group"
          aria-label="Language selection"
        >
          <input
            id="english"
            type="radio"
            class="btn-check"
            name="language"
            autocomplete="off"
            checked
          >
          <label
            class="btn btn-primary"
            for="english"
          >English</label>

          <input
            id="french"
            type="radio"
            class="btn-check"
            name="language"
            autocomplete="off"
            disabled
          >
          <label
            class="btn btn-outline-secondary"
            for="french"
          >French</label>

          <input
            id="arabic"
            type="radio"
            class="btn-check"
            name="language"
            autocomplete="off"
            disabled
          >
          <label
            class="btn btn-outline-secondary"
            for="arabic"
          >Arabic</label>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>

  export default {
      name : "ChangeLaguage",
      data(){
        return{
          
        }
      },
      }
  
  </script>