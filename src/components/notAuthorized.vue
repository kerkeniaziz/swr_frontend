<template>
  <!-- Error 404 Template 1 - Bootstrap Brain Component -->
  <section class="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <h2 class="d-flex justify-content-center align-items-center gap-2 mb-4">
              <span class="display-1 fw-bold">4</span>
              <i class="bi bi-exclamation-circle-fill text-danger display-4" />
              <span class="display-1 fw-bold bsb-flip-h">1</span>
            </h2>
            <h3 class="h2 mb-2">
              Not Authorized! 
            </h3>
            <h3 class="h2 mb-2 mt-4">
              You dont have acces to this page.
            </h3>
            <p class="mb-5 mt-5">
              The page you are looking for need a higher privileges.
            </p>
            <router-link
              v-if="$store.state.isLogedIn"
              class="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
              to="/dashboard"
            >
              Back to Dashboard
            </router-link>
            <router-link
              v-else
              class="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
              to="/"
            >
              Back to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
      export default {
          name: 'NotAuthorized',
      }
  </script>
  
  <style>
  
  </style>