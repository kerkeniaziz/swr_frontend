<template>
  <div
    v-show="loading"
    class="spinner-container"
  >
    <div class="spinner" />
  </div>
</template>
  
  <script>
  export default {
    name: 'SpinnerPage',
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .spinner-container {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3); /* Lighter border */
    border-radius: 50%;
    border-top: 4px solid #ffffff; /* White border */
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; /* Spin animation */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  