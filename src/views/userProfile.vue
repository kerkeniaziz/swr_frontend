<template>
  <div>
    <ProfilePage v-if="role ==='candidate' " />
    <CompanyProfile v-if="isNotCandidate" />
  </div>
</template>
  
  <script>

  import axios from 'axios';
import ProfilePage from '../components/user/profilePage.vue'
  import CompanyProfile from '../components/company/companyProfile.vue';
  
  export default {
    name: "UserProfile",
    components: {
      ProfilePage,
      CompanyProfile,
    },
    data(){
          return{
            role:"",
            isNotCandidate:false,
          }
      },
    created(){
       this.fetchUser()


    },
    methods: {
      async fetchUser(){
        try {
          const response = await axios.get(`/user/${this.$route.params.id}`);
          this.role = response.data.user.role;      
          this.isNotCandidate = this.role!== 'candidate';
        }
      catch (error) {
          console.error(error);
      }
    }

  }
}
</script>
  
  <style>

  </style>
  