<template>
    <div class="" :class="docName? '':'m-8'">
  <div v-if="this.$route.matched[0].path ==='/doc/:docName'" class="text-center  mb-4">
        <h3 class="fw-bold">Document :</h3>
        <h5>{{ this.$route.params.docName  }}</h5>
        
    </div>
    <vue-office-docx 
    class="mb-10  mx-auto"
        :src="docx"
        style="height: 100vh;"

    />
</div>
  </template>
  
  <script>
  //引入VueOfficeDocx组件
  import VueOfficeDocx from '@vue-office/docx'
  //引入相关样式
  import '@vue-office/docx/lib/index.css'
  
  export default {
    name: 'DocxViewer',
    props: {
    docName: {
      type:String,
      default: ''
    },
  }, 
    components:{
      VueOfficeDocx
    },
    data(){
      return {
        docx: "" //设置文档网络地址，可以是相对地址
      }
    },
    beforeMount(){
        this.fetchdoc();
    },
    methods:{
        fetchdoc(){
            if (this.docName){
          this.docx = `http://localhost:8000/file/${this.docName}`
        }
        else {
          this.docx =`http://localhost:8000/file/${this.$route.params.docName}`
        }      }
    }
  }
  </script>
  