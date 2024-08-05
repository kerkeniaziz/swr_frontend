<template>
  <div
    v-show="isVisible"
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
  },
  data() {
    return {
      isVisible: false,
      timeout: null
    };
  },
  watch: {
    loading(newVal) {
      if (newVal) {
        this.isVisible = newVal;
        // Set a timeout to hide the spinner after 10 seconds
        this.timeout = setTimeout(() => {
          if (this.isVisible) {
            this.isVisible = false;
          }
        }, 10000); // 10 seconds
      } else {
        // Hide spinner immediately if loading becomes false
        this.isVisible = false;
        clearTimeout(this.timeout);
      }
    }
  },
  unmounted() {
    // Clear the timeout if the component is destroyed to avoid memory leaks
    clearTimeout(this.timeout);
  }
}
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
