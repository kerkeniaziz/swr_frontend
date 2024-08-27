<template>
  <div
    class=""
    :class="pdfName? '':'m-8'"
  >
    <div
      v-if="$route.matched[0].path ==='/pdf/:pdfName'"
      class="text-center  mb-4"
    >
      <h3 class="fw-bold">
        Document :
      </h3>
      <h5>{{ $route.params.pdfName }}</h5>
    </div>
    <vue-pdf-app
      style="height: 1000px;"
      :pdf="pdf"
    />
  </div>
</template>

<script>
import VuePdfApp from "vue3-pdf-app";
// import this to use default icons for buttons
import "vue3-pdf-app/dist/icons/main.css";

export default {
  name:'PdfViewer', 
  components: {
    VuePdfApp
  },
  props: {
    pdfName: {
      type:String,
      default: ''
    },
  },
  data(){
      return {
        pdf : ''
      }
    },
    beforeMount() {
      this.fetchpdf();
    },
    methods: {
       fetchpdf(){
        if (this.pdfName){
          this.pdf = `http://localhost:8000/file/${this.pdfName}`
        }
        else {
          this.pdf =`http://localhost:8000/file/${this.$route.params.pdfName}`
        }
        
    }
  }
};
</script>

<style >
#openFile{
  display: none;
}
.pdf-app .toolbar{
  z-index: 1 !important;
}
</style>